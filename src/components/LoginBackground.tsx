"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ICON_SIZE = 56;

type Row = { id: number; direction: "left" | "right"; speed: number };

export default function AnimalsBackground({ icons }: { icons: string[] }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [cols, setCols] = useState(0);
  const nextId = useRef(0);

  useEffect(() => {
    function calc() {
      const targetRowCount = Math.ceil(window.innerHeight / ICON_SIZE);
      const targetCols = Math.ceil(window.innerWidth / ICON_SIZE) + 4;

      setCols(targetCols);

      setRows((prev) => {
        if (targetRowCount === prev.length) return prev;

        if (targetRowCount < prev.length) {
          return prev.slice(0, targetRowCount);
        }

        const additional: Row[] = Array.from(
          { length: targetRowCount - prev.length },
          () => {
            const id = nextId.current++;
            return {
              id,
              direction: id % 2 === 0 ? "right" : "left",
              speed: 150 + (id % 3) * 10,
            };
          },
        );
        return [...prev, ...additional];
      });
    }

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  if (rows.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 flex flex-col overflow-hidden">
      {rows.map((row) => {
        const rowIcons = Array.from({ length: cols }).map(
          (_, i) => icons[(row.id * cols + i) % icons.length],
        );

        return (
          <div
            key={row.id}
            className="flex flex-1 items-center"
            style={{ minHeight: ICON_SIZE }}
          >
            <div
              className="flex w-max shrink-0 animate-(--row-anim) motion-reduce:animate-none!"
              style={
                {
                  "--row-anim": `scroll-${row.direction} ${row.speed}s linear infinite`,
                } as React.CSSProperties
              }
            >
              {[...rowIcons, ...rowIcons].map((icon, i) => (
                <Image
                  key={`${row.id}-${i}`}
                  src={`/animals/${icon}`}
                  alt=""
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  unoptimized
                  className="mx-4 opacity-20 dark:opacity-10"
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
