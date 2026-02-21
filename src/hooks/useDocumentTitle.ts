import { useEffect } from "react";

export default function useDocumentTitle(title: string) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Lexi Ops AI | ${title}`;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
