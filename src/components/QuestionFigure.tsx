import { GeoFigure } from './GeoFigure';
import { SceneFigure } from './SceneFigure';
import { DIAGRAMS } from '../data/carbonDiagrams';

// The figure (Maths) and the chemistry diagram that can sit beside a question. Kept in one place so
// the drawing code is downloaded only when a question that has a figure is actually opened.
export default function QuestionFigure({ q }: { q: any }) {
  return (
    <>
      {q.figure && (<div className="flex justify-center"><GeoFigure spec={q.figure} max={320} /></div>)}
      {q.diagram && DIAGRAMS[q.diagram] && (<div className="flex justify-center"><SceneFigure scene={DIAGRAMS[q.diagram]()} max={420} /></div>)}
    </>
  );
}
