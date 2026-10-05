import Image from "next/image";

export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`consulting-wordmark${light ? " consulting-wordmark-light" : ""}`}>
      <Image
        src="/wivosoft-brand.png"
        alt="Wivosoft"
        width={1536}
        height={1024}
        priority={!light}
        unoptimized
      />
    </span>
  );
}
