<?php

namespace App\EventListener;

use App\Entity\GymEvent;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class GymEventListener
{
    /**
     * @var Security
     */
    private $security;

    /**
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args): void
    {
        $gymEvent = $args->getEntity();
        $user = $this->security->getUser();

        if (!$gymEvent instanceof GymEvent || !$user instanceof UserInterface) {
            return;
        }

        $gymEvent->setCreatedBy($user);
    }
}
