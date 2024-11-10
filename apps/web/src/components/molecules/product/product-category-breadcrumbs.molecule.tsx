"use client"

import { getCatogoryName } from "@shopizer/utils/data";
import { useEffect, useState } from "react";

interface MProductCategoryBreadcrumbsProps {
    category: any;
}

export function MProductCategoryBreadcrumbs(props: MProductCategoryBreadcrumbsProps) {
    const [categoryName, setCategoryName] = useState<string>(''); 
    useEffect(() => {
      if(!props.category) return; 
        setCategoryName(getCatogoryName(props.category));
    }, [props.category]);

  return <div>{categoryName}</div>;
}