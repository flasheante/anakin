import Image from "next/image";
import type { Member } from "@/data/types";

/** Fanzine-style member entry: photo (or empty slot), name, instruments. */
export function BandMember({ member, index = 0 }: { member: Member; index?: number }) {
  return (
    <article className={`border border-paper bg-coal p-3 ${index % 2 ? "tilt-r" : "tilt-l"}`}>
      {member.photo ? (
        <div className="photocopy photocopy-hover relative aspect-[4/5] border border-ash">
          <Image src={member.photo} alt={`${member.name}, de ANAKIN`} fill sizes="(min-width: 768px) 240px, 45vw" className="object-cover" unoptimized={member.photo.endsWith(".svg")} />
        </div>
      ) : (
        <div aria-hidden="true" className="halftone pixel flex aspect-[4/5] items-center justify-center border border-dashed border-ash text-2xl text-dust">
          [ FOTO ]
        </div>
      )}
      <h3 className="pixel mt-3 text-4xl uppercase">{member.name}</h3>
      <p className="pixel text-xl text-yolk uppercase">{member.roles.join(" / ")}</p>
      {member.bio && <p className="mt-2 text-sm">{member.bio}</p>}
    </article>
  );
}
