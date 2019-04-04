<?php

namespace App\Controller;

use App\Entity\GymCourt;
use App\Entity\Permission;
use App\Form\Permission\PermissionApproveType;
use App\Form\Permission\PermissionRequestType;
use App\Service\JsonSerializeService;
use App\Service\PermissionService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/permission")
 */
class PermissionController extends BaseController
{
    /**
     * @var PermissionService
     */
    private $permissionService;

    /**
     * @var JsonSerializeService
     */
    private $serializer;

    /**
     * @param PermissionService $permissionService
     * @param JsonSerializeService $serializer
     */
    public function __construct(PermissionService $permissionService, JsonSerializeService $serializer)
    {
        $this->permissionService = $permissionService;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/new", name="api:permission:new")
     * @Security("is_granted('API_ACCESS')")
     *
     * @param Request $request
     * @return Response
     */
    public function newPermission(Request $request): Response
    {
        $permission = new Permission();
        $form = $this->createForm(PermissionRequestType::class, $permission);
        $form->handleRequest($request);
        if ($form->isValid() && $form->isSubmitted()) {
            $permission->setUser($this->getUser());
            $file = $permission->getFile();

            if ($file) {
                $fileName = md5(uniqid()) . '.' . $file->guessExtension();
                try {
                    $file->move($this->getParameter('contract_directory'), $fileName);
                    $permission->setFilePath($fileName);
                } catch (FileException $e) {
                    return new JsonResponse($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
                }
            }

            $this->persist($permission);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form), Response::HTTP_OK);
    }

    /**
     * @Route("/approve/{id}", name="api:permission:approve")
     * @Security("is_granted('API_ACCESS')")
     *
     * @param Request $request
     * @param Permission $permission
     * @return Response
     */
    public function approvePermission(Request $request, Permission $permission): Response
    {
        $form = $this->createForm(PermissionApproveType::class, $permission);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form), Response::HTTP_OK);
    }


    /**
     * @Route("/delete/{id}", name="api:permission:delete")
     * @Security("is_granted('API_ACCESS')")

     * @param Permission $permission
     * @return JsonResponse
     */
    public function deletePermission(Permission $permission): JsonResponse
    {
        $this->remove($permission);
        $this->flush();

        return new JsonResponse();
    }

    /**
     * @Route("/gym-court/{id}", name="api:permission:gym-court")
     * @Security("is_granted('API_ACCESS')")
     *
     * @param GymCourt $court
     * @return Response
     */
    public function getPermissionToCourt(GymCourt $court): Response
    {
        $permission = $this->permissionService->getUserPermissionForGymCourt($court);

        return new Response($this->serializer->serialize($permission));

    }

    /**
     * @Route("/all", name="api:permission:pending")
     * @Security("is_granted('API_ACCESS')")
     *
     * @return Response
     */
    public function getPermissions(): Response
    {
        return new Response($this->serializer->serialize($this->permissionService->getPermissions()));
    }

    /**
     * @Route("/download/{fileName}", name="api:permission:download")
     * @param string $fileName
     *
     * @return BinaryFileResponse
     */
    public function downloadPermissionFile(string $fileName): BinaryFileResponse
    {
        return $this->file($this->getParameter('contract_directory') . '/' . $fileName);
    }
}
