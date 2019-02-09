<?php

namespace App\Form\Event;

use App\Entity\Court;
use App\Entity\Event;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EventType extends AbstractType
{
    /**
     * @inheritdoc
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('creatorFirstName', TextType::class)
            ->add('creatorLastName', TextType::class)
            ->add('creatorEmail', TextType::class)
            ->add('creatorPhoneNumber', TextType::class)
            ->add('name', TextType::class)
            ->add('date', DateType::class, [
                'widget' => 'single_text',
            ])
            ->add('startTime', TextType::class)
            ->add('endTime', TextType::class)
            ->add('neededPlayers', IntegerType::class)
            ->add('comment', TextType::class)
            ->add('court', EntityType::class, [
                'class' => Court::class,
            ]);

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
            'data_class' => Event::class,
        ]);
    }
}
