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
            ->add('name', TextType::class)
            ->add('date', DateType::class, [
                'widget' => 'single_text',
            ])
            ->add('startTime', TextType::class)
            ->add('neededPlayers', IntegerType::class)
            ->add('comment', TextType::class)
            ->add('court', EntityType::class, [
                'class' => Court::class,
            ]);

        $dateTimeTransformer = new CallbackTransformer(
            function ($timeAsString) {
                if (is_object($timeAsString)) {
                    return $timeAsString->format('Y-m-d');
                }

                return $timeAsString ? new \DateTime($timeAsString) : null;
            },
            function ($dateTimeAsString) {
                return new \DateTime(is_array($dateTimeAsString) ? date('Y-m-d H:i', $dateTimeAsString['timestamp']) : $dateTimeAsString);
            }
        );

        $builder->get('startTime')->addModelTransformer($dateTimeTransformer);
    }

    /**
     * @inheritdoc
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Event::class,
            'csrf_protection' => false,
        ]);
    }
}
