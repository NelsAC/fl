import { FastLearningLayout } from "../layout/FastLearningLayout";
import { NavBarInicioView, NothingPublicationView, PublicationView } from "../views";


export const FastLearningPage = () => {
  return (
    <FastLearningLayout>
      {/* navbar inicio */}
      <NavBarInicioView />

      <div className="content__body">
        <NothingPublicationView />
        {/* <PublicationView /> */}
      </div>  

    </FastLearningLayout>
  )
}
