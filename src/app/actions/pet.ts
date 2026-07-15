import prisma from "@/prisma";

const DEFAULT_PAGE_SIZE = 20;

export interface DashboardPet {
  id: string;
  name: string;
  breed: string | null;
  avatarUrl: string | null;
  dietType: string | null;
  lastVetVisit: Date | null;
  age: number | null;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface FetchPetsForDashboardResult {
  pets: DashboardPet[];
  pagination: PaginationInfo;
}

export async function fetchPetsForDashboard(
  userId: string,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<FetchPetsForDashboardResult> {
  const [pets, total] = await Promise.all([
    prisma.pet.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        breed: true,
        avatar: {
          select: {
            url: true,
          },
        },
        dietType: {
          select: {
            name: true,
          },
        },
        vetVisits: {
          orderBy: {
            date: "desc",
          },
          take: 1,
          select: {
            date: true,
          },
        },
        birthDate: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        name: "asc",
      },
    }),
    prisma.pet.count({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    }),
  ]);

  return {
    pets: pets.map(
      (pet): DashboardPet => ({
        id: pet.id,
        name: pet.name,
        breed: pet.breed,
        avatarUrl: pet.avatar?.url ?? null,
        dietType: pet.dietType?.name ?? null,
        age: pet.birthDate ? new Date().getFullYear() - new Date(pet.birthDate).getFullYear() : null,
        lastVetVisit: pet.vetVisits[0]?.date ?? null,
      }),
    ),
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}
