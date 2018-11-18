<?php

namespace App\Form\Event;

use App\Entity\Court;
use App\Entity\Event;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
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
            ->add('startTime', DateTimeType::class, [
                'widget' => 'single_text',
            ])
            ->add('endTime', DateTimeType::class, [
                'widget' => 'single_text',
            ])
            ->add('neededPlayers', IntegerType::class)
            ->add('comment', TextType::class)
            ->add('court', EntityType::class, [
                'class' => Court::class,
            ]);
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