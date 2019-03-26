<?php

namespace App\Controller;

use App\Entity\Permission;
use App\Form\Permission\PermissionApproveType;
use App\Form\Permission\PermissionRequestType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
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
     * @Route("/new", name="api:permission:new", methods={"post"})
     * @Security("is_granted('API_ACCESS')")
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function newPermission(Request $request): Response
    {
        $permission = new Permission();
        $form = $this->createForm(PermissionRequestType::class, $permission);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $permission->setUser($this->getUser());

            $this->persist($permission);
            $this->flush();

            return new JsonResponse('success', Response::HTTP_CREATED);
        }

        return new JsonResponse($this->getFormErrors($form), Response::HTTP_OK);
    }

    /**
     * @Route("/approve/{id}", name="api:permission:approve", methods={"post"})
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
}
