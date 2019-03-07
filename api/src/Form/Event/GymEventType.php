<?php

namespace App\Form\Event;

use App\Entity\GymCourt;
use App\Entity\GymEvent;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GymEventType extends AbstractType
{
    /**
     * @inheritdoc
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class)
            ->add('date', DateType::class, [
                'widget' => 'single_text',
            ])
            ->add('startTime', TextType::class)
            ->add('endTime', TextType::class)
            ->add('neededPlayers', IntegerType::class)
            ->add('comment', TextType::class)
            ->add('gymCourt', EntityType::class, [
                'class' => GymCourt::class,
            ])
            ->add('price', NumberType::class);

        $dateTimeTransformer = new CallbackTransformer(
            function (?string $timeAsString) {
                return $timeAsString ? new \DateTime($timeAsString) : null;
            },
            function ($dateTimeAsString) {
                return new \DateTime($dateTimeAsString);
            }
        );

        $builder->get('startTime')->addModelTransformer($dateTimeTransformer);
        $builder->get('endTime')->addModelTransformer($dateTimeTransformer);
    }

    /**
     * @inheritdoc
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GymEvent::class,
            'csrf_protection' => false,
        ]);
    }
}
