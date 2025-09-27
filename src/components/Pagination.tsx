import React from 'react'

/**
 * Pagination component
 *
 * Props:
 * - currentPage: current page (1-based)
 * - totalPages: number of pages (>= 1)
 * - onPageChange: (page: number) => void
 * - siblingCount: number of pages to show on each side of current (default 1)
 * - boundaryCount: number of pages to always show at start/end (default 1)
 * - className: wrapper className
 * - showSummary: whether to render "Showing X–Y of Z" summary
 * - totalItems, pageSize: used to compute the summary if showSummary=true
 */

const DOTS = 'DOTS' as const
type Dots = typeof DOTS

function range(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
  className?: string
  showSummary?: boolean
  totalItems?: number
  pageSize?: number
}

function getPaginationRange({
  currentPage,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  currentPage: number
  totalPages: number
  siblingCount?: number
  boundaryCount?: number
}): (number | Dots)[] {
  // Based on Material-UI pagination range logic but simplified.
  const totalPageNumbers = siblingCount * 2 + boundaryCount * 2 + 3 // current + 2 dots
  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const showLeftDots = leftSiblingIndex > boundaryCount + 2
  const showRightDots = rightSiblingIndex < totalPages - (boundaryCount + 1)

  const pages: (number | Dots)[] = []

  // left boundary
  for (const p of range(1, boundaryCount)) pages.push(p)

  if (showLeftDots) {
    pages.push(DOTS)
  } else {
    // no left dots: show the gap pages
    for (const p of range(boundaryCount + 1, leftSiblingIndex - 1)) pages.push(p)
  }

  // middle pages
  for (const p of range(leftSiblingIndex, rightSiblingIndex)) pages.push(p)

  if (showRightDots) {
    pages.push(DOTS)
  } else {
    for (const p of range(rightSiblingIndex + 1, totalPages - boundaryCount)) pages.push(p)
  }

  // right boundary
  for (const p of range(totalPages - boundaryCount + 1, totalPages)) pages.push(p)

  return pages
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  className,
  showSummary = false,
  totalItems,
  pageSize,
}) => {
  if (totalPages <= 1) return null // nothing to show

  const paginationRange = getPaginationRange({
    currentPage,
    totalPages,
    siblingCount,
    boundaryCount,
  })

  const handlePageChange = (page: number) => {
    const p = Math.max(1, Math.min(totalPages, page))
    if (p === currentPage) return
    onPageChange(p)
  }

  // compute summary
  const startItem =
    typeof totalItems === 'number' && typeof pageSize === 'number'
      ? (currentPage - 1) * pageSize + 1
      : undefined
  const endItem =
    typeof totalItems === 'number' && typeof pageSize === 'number'
      ? Math.min(totalItems, currentPage * pageSize)
      : undefined

  return (
    <div className={`flex items-center justify-between gap-4 ${className ?? ''}`}>
      {showSummary && typeof totalItems === 'number' && typeof pageSize === 'number' ? (
        <div className="text-sm text-muted-foreground">
          Showing {startItem}–{endItem} of {totalItems}
        </div>
      ) : (
        <div />
      )}

      <nav aria-label="Pagination" className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`px-3 py-2 rounded-md text-sm ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Prev
        </button>

        {paginationRange.map((page, idx) =>
          page === DOTS ? (
            <span key={`dots-${idx}`} className="px-2 text-sm select-none">
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-semibold ${
                page === currentPage
                  ? 'bg-black text-white'
                  : 'border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`px-3 py-2 rounded-md text-sm ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  )
}

export default Pagination
