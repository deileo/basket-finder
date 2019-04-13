<?php

namespace App\Form\Court;

use App\Entity\Court;
use App\Entity\GymCourt;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GymCourtType extends AbstractType
{
    /**
     * @inheritDoc
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('location', TextType::class)
            ->add('name', TextType::class)
            ->add('lat', NumberType::class)
            ->add('long', NumberType::class)
            ->add('condition', TextareaType::class);
    }

    /**
     * @inheritDoc
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GymCourt::class,
            'csrf_protection' => false,
        ]);
    }
}
