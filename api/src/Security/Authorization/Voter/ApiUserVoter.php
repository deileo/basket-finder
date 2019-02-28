<?php

namespace App\Security\Authorization\Voter;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class ApiUserVoter extends Voter
{
    const API_ACCESS = 'API_ACCESS';

    /**
     * @var array
     */
    private $supportedAccess = [
        self::API_ACCESS,
    ];

    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @var Security
     */
    private $security;

    /**
     * @param Security $security
     * @param RequestStack $requestStack
     */
    public function __construct(Security $security, RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
        $this->security = $security;
    }

    /**
     * @inheritdoc
     */
    protected function supports($attribute, $subject): bool
    {
        return in_array($attribute, $this->supportedAccess);
    }

    /**
     * @inheritdoc
     */
    protected function voteOnAttribute($attribute, $subject, TokenInterface $token): bool
    {
        $request = $this->requestStack->getMasterRequest();
        if ($request->getMethod() === Request::METHOD_OPTIONS) {
            return true;
        }

        return $this->security->isGranted('ROLE_USER');
    }
}
