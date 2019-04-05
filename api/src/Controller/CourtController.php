<?php

namespace App\Controller;

use App\Entity\CourtInterface;
use App\Service\CourtService;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/courts")
 */
class CourtController extends BaseController
{
    /**
     * @var CourtService
     */
    private $courtService;

    /**
     * @var JsonSerializeService
     */
    private $serializer;

    /**
     * @param CourtService $courtService
     * @param JsonSerializeService $serializer
     */
    public function __construct(CourtService $courtService, JsonSerializeService $serializer)
    {
        $this->courtService = $courtService;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/{type}/all", name="api:courts:all")
     * @param string $type
     * @return JsonResponse|Response
     */
    public function getCourtsAction(string $type): Response
    {
        return new Response($this->serializer->serialize($this->courtService->getCourtsByType($type), ['default']));
    }


    /**
     * @Route("/all/court/admin", name="api:courts:admin:all")
     */
    public function getAllCourtsAction(): Response
    {
        return new Response($this->serializer->serialize($this->courtService->getAllCourts(), ['default']));
    }

    /**
     * @Route("/all/gym-court/admin", name="api:gym-courts:admin:all")
     */
    public function getAllGymCourtsAction(): Response
    {
        return new Response($this->serializer->serialize($this->courtService->getAllGymCourts(), ['default']));
    }

    /**
     * @Route("/{type}/{id}", name="api:courts:get")
     * @ParamConverter("CorurtInterface", class="App\Entity\CourtInterface")
     * @param CourtInterface $court
     * @return Response
     */
    public function getCourt(CourtInterface $court): Response
    {
        return new Response($this->serializer->serialize($court, ['default']));
    }
}
