import { renderGradePdfNotes } from './LearnOptics';

// Thin wrapper so the printable optics notes (part of the large LearnOptics file) load on demand.
export default function GradePdfNotes({ args }: { args: Parameters<typeof renderGradePdfNotes> }) {
  return <>{renderGradePdfNotes(...args)}</>;
}
