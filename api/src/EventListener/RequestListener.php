<?php

namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class RequestListener
{
    /**
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event): void
    {
        if (!$this->isValidRequest($event)) {
            return;
        }

        $request = $event->getRequest();
        $postData = json_decode($request->getContent(), true);
        if ($postData) {
            $event->getRequest()->request->add($postData);
        }
    }

    /**
     * @param GetResponseEvent $event
     * @return bool
     */
    private function isValidRequest(GetResponseEvent $event): bool
    {
        return $event->isMasterRequest() && $event->getRequest()->getMethod() === 'POST';
    }
}
