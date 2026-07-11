import { IconCat } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyDashboard() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCat />
        </EmptyMedia>
        <EmptyTitle>No Pets Yet</EmptyTitle>
        <EmptyDescription>
          You haven't added any pets yet. Start adding some to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button>Create Pet</Button>
      </EmptyContent>
    </Empty>
  );
}
