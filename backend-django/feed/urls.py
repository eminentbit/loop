from rest_framework.routers import DefaultRouter # type: ignore
from .views import FeedViewSet

router = DefaultRouter()
router.register(r'posts', FeedViewSet, basename='post')
router.register(r'comments', FeedViewSet, basename='comments')
router.register(r'reports', FeedViewSet)

urlpatterns = router.urls
