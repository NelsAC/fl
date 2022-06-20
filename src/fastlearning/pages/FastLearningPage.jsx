import { useSelector } from "react-redux";
import { FastLearningLayout } from "../layout/FastLearningLayout";
import { NavBarInicioView, NothingPublicationView, PublicationView } from "../views";


export const FastLearningPage = () => {

  const { loading, posts } = useSelector(state => state.learning);

  return (
    <FastLearningLayout>
      {/* navbar inicio */}
      <NavBarInicioView />

      <div className="content__body">
        {
          ( posts.length > 0 )
          ? (
            posts.map(post => (
              <PublicationView key={post.id} post={post} />
            ))
          )
          : <NothingPublicationView />
        }
      </div>  

    </FastLearningLayout>
  )
}
