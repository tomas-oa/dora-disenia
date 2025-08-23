import Link from "next/link";

import { clsx } from "clsx";

type BreadcrumbTypeBase = {
  /** The title of the breadcrumb, displayed as the link text */
  title: React.ReactNode;
  /** Just in case you need to override styles */
  className?: string;
};

type BreadcrumbType = BreadcrumbTypeBase & {
  href: string;
  params?: Record<string, any>;
  /**
   * See https://nextjs.org/docs/api-reference/next/link#replace
   */
  replace?: boolean;
};


/**
 * Breadcrumbs component to display a list of navigational links. It marks the last item as the current page.
 * @example
 * <Breadcrumbs className="w-full" breadcrumbs={[]} />
 */
export function Breadcrumb({
  breadcrumbs,
  className,
  ...props
}: { breadcrumbs: BreadcrumbType[] } & React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx("overflow-x-auto scrollbar-hide", "text-sm font-medium", className)}
      {...props}
    >
      <ol role="list" className="flex flex-row items-center gap-2">
        {breadcrumbs.map((breadcrumb, i, { length }) => {
          const isLast = i === length - 1;

          return (
            <li
              key={i}
              className={clsx(
                "mt-2 last-of-type:pr-4",
                "first-of-type:text-stone-500 hover:text-stone-600 dark:hover:text-stone-600",
                "transition-colors",
                "before:content-['/'] before:mr-2 before:text-current only:before:hidden",
                "first-of-type:before:content-['←']",
              )}
            >
              <Link
                href={breadcrumb.href}
                replace={breadcrumb.replace}
                className={clsx(
                  "truncate", // line-clamp-1
                  breadcrumb.className,
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {breadcrumb.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}