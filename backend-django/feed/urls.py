from rest_framework.routers import DefaultRouter # type: ignore
from .views import FeedViewSet

router = DefaultRouter()
router.register(r'posts', FeedViewSet)

urlpatterns = router.urls
