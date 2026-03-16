// ── utils.js ──────────────────────────────────────────────────
// Cubic bezier solver + easing map used by EaseDemo.
//
// This is the same math browsers use internally for CSS easing.
// We replicate it here so the demo ball uses the exact same
// curve as Framer Motion's ease strings do internally.

// Each array is [p1x, p1y, p2x, p2y] — the two control points
// of a cubic bezier curve, matching CSS cubic-bezier() syntax.
export const easingMap = {
  easeIn:     [0.42, 0, 1, 1],
  easeOut:    [0, 0, 0.58, 1],
  easeInOut:  [0.42, 0, 0.58, 1],
  linear:     [0, 0, 1, 1],
  backOut:    [0.34, 1.56, 0.64, 1],   // p2y > 1 = overshoot past the target
  anticipate: [0.36, -0.4, 0.14, 1.4], // p1y < 0 = slight pullback at start
};

// Solves for the Y value of a cubic bezier at a given T (0–1).
// Uses Newton-Raphson iteration to find x → solve for y.
// Returns a function: (t: number) => number
export function solveCubic(p1x, p1y, p2x, p2y) {
  return (t) => {
    const cx = 3 * p1x, bx = 3 * (p2x - p1x) - cx, ax = 1 - cx - bx;
    const cy = 3 * p1y, by = 3 * (p2y - p1y) - cy, ay = 1 - cy - by;
    let x = t;
    for (let i = 0; i < 10; i++) {
      const ex = ((ax * x + bx) * x + cx) * x - t;
      const dx = (3 * ax * x + 2 * bx) * x + cx;
      if (Math.abs(dx) < 1e-6) break;
      x -= ex / dx;
    }
    return ((ay * x + by) * x + cy) * x;
  };
}
