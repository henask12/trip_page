import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "@/data/types";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";
import SkeletonImage from "@/shared/SkeletonImage";

export interface CardCategory4Props {
  className?: string;
  taxonomy: TaxonomyType;
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  taxonomy,
}) => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [imageLoaded]);

  const { count, name, href = "/", thumbnail, listingType } = taxonomy;
  return (
    <Link
      href={href}
      className={`nc-CardCategory4 flex flex-col ${className}`}
      data-nc-id="CardCategory4"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-2 sm:aspect-h-2 h-0 rounded-2xl overflow-hidden group`}
      >
        {loading && <SkeletonImage className="absolute inset-0" />}{" "}
        <Image
          src={thumbnail || ""}
          className="object-cover w-full h-full rounded-2xl"
          fill
          alt="archive"
          sizes="(max-width: 400px) 100vw, 400px"
          onLoadingComplete={() => setImageLoaded(true)}
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
    </Link>
  );
};

export default CardCategory4;
