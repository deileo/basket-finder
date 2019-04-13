<?php

namespace App\Controller;

use App\Entity\Court;
use App\Entity\CourtInterface;
use App\Entity\GymCourt;
use App\Form\Court\CourtType;
use App\Form\Court\GymCourtType;
use App\Service\CourtService;
use App\Service\GeoCoderService;
use App\Service\JsonSerializeService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
     * @var GeoCoderService
     */
    private $geoCoderService;

    /**
     * @param CourtService $courtService
     * @param JsonSerializeService $serializer
     * @param GeoCoderService $geoCoderService
     */
    public function __construct(CourtService $courtService, JsonSerializeService $serializer, GeoCoderService $geoCoderService)
    {
        $this->courtService = $courtService;
        $this->serializer = $serializer;
        $this->geoCoderService = $geoCoderService;
    }

    /**
     * @Route("/court/new", name="api:courts:court:new")
     * @Security("is_granted('API_ACCESS')")
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createNewCourt(Request $request): JsonResponse
    {
        $court = new Court();
        $form = $this->createForm(CourtType::class, $court);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $court->setCreatedBy($this->getUser());
            $address = $this->geoCoderService->getAddressFromCoordinates($court->getLat(), $court->getLong());
            $court->setAddress($address);

            $this->persist($court);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form));
    }

    /**
     * @Route("/gym-court/new", name="api:courts:gym-court:new")
     * @Security("is_granted('API_ACCESS')")
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createNewGymCourt(Request $request): JsonResponse
    {
        $court = new GymCourt();
        $form = $this->createForm(GymCourtType::class, $court);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $court->setCreatedBy($this->getUser());
            $address = $this->geoCoderService->getAddressFromCoordinates($court->getLat(), $court->getLong());
            $court->setAddress($address);

            $this->persist($court);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form));
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
     * @Route("/admin/new", name="api:courts:new")
     * @return Response
     */
    public function getNewCourts(): Response
    {
        return new Response($this->serializer->serialize($this->courtService->getNewCourts()));
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

    /**
     * @Route("/{type}/enable/{id}", name="api:courts:enable")
     * @ParamConverter("CorurtInterface", class="App\Entity\CourtInterface")
     * @param CourtInterface $court
     * @return JsonResponse
     */
    public function enableCourt(CourtInterface $court): JsonResponse
    {
        $court->setEnabled(true);
        $court->setNew(false);

        $this->flush();

        return new JsonResponse();
    }

    /**
     * @Route("/{type}/disable/{id}", name="api:courts:disable")
     * @ParamConverter("CorurtInterface", class="App\Entity\CourtInterface")
     * @param CourtInterface $court
     * @return JsonResponse
     */
    public function disableCourt(CourtInterface $court): JsonResponse
    {
        $court->setEnabled(false);

        $this->flush();

        return new JsonResponse();
    }

    /**
     * @Route("/{type}/delete/{id}", name="api:courts:delete")
     * @ParamConverter("CorurtInterface", class="App\Entity\CourtInterface")
     * @param CourtInterface $court
     * @return JsonResponse
     */
    public function deleteCourt(CourtInterface $court): JsonResponse
    {
        $this->remove($court);
        $this->flush();

        return new JsonResponse();
    }
}
