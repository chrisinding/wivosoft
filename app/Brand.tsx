import Image from "next/image";

export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`consulting-wordmark${light ? " consulting-wordmark-light" : ""}`}>
      <Image
        src="/wivosoft-wordmark.webp"
        alt="Wivosoft"
        width={935}
        height={190}
        priority={!light}
        unoptimized
      />
    </span>
  );
}
