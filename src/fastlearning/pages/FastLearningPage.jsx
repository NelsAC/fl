import { useDispatch, useSelector } from "react-redux";
import { startLoadingAllComments } from "../../store/comment";
import { CheckingAuth } from "../../ui/components/CheckingAuth";
import { FastLearningLayout } from "../layout/FastLearningLayout";
import {
  NavBarInicioView,
  NothingPublicationView,
  PublicationView,
} from "../views";

export const FastLearningPage = () => {
  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => state.learning);

  if (!!loading) {
    return <CheckingAuth />;
  }

  dispatch(startLoadingAllComments());

  return (
    <FastLearningLayout>
      {/* navbar inicio */}
      <NavBarInicioView />

      <div className="content__body">
        {posts.length > 0 ? (
          posts.map((post) => <PublicationView key={post.id} post={post} />)
        ) : (
          <NothingPublicationView />
        )}
      </div>
    </FastLearningLayout>
  );
};
