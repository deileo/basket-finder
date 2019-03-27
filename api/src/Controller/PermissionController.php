<?php

namespace App\Controller;

use App\Entity\Permission;
use App\Form\Permission\PermissionApproveType;
use App\Form\Permission\PermissionRequestType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
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
