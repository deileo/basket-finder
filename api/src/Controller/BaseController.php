<?php

namespace App\Controller;

use Doctrine\Common\Persistence\ObjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BaseController extends Controller
{
    /**
     * @param $object
     */
    protected function persist($object): void
    {
        $this->getDoctrine()->getManager()->persist($object);
    }

    /**
     * @param $object
     */
    protected function remove($object): void
    {
        $this->getDoctrine()->getManager()->remove($object);
    }

    protected function flush(): void
    {
        $this->getDoctrine()->getManager()->flush();
    }

    /**
     * @param string $className
     * @return ObjectRepository
     */
    protected function getRepo(string $className): ObjectRepository
    {
        return $this->getDoctrine()->getRepository($className);
    }
}
