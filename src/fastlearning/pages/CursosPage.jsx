import { FastLearningLayout } from "../layout/FastLearningLayout";
import { CoursesView, NavBarCursosView } from "../views";


export const CursosPage = () => {
  return (
    <FastLearningLayout>
      {/* navbar curso */}
      <NavBarCursosView />

      <div className="content__body">
        <CoursesView />
      </div>  

    </FastLearningLayout>
  )
}
