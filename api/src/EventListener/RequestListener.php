<?php

namespace App\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class RequestListener
{
    /**
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event): void
    {
        if (!$event->isMasterRequest()) {
            return;
        }

        $request = $event->getRequest();

        if ($request->getMethod() === Request::METHOD_OPTIONS) {
            $event->setResponse(new JsonResponse());
        }

        if ($request->getMethod() === Request::METHOD_POST) {
            $postData = json_decode($request->getContent(), true);
            if ($postData) {
                $event->getRequest()->request->add($postData);
            }
        }
    }
}
