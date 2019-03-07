<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190307161738 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE event_participants (event_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_9C7A7A6171F7E88B (event_id), INDEX IDX_9C7A7A61A76ED395 (user_id), PRIMARY KEY(event_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE gym_event_participants (gym_event_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_6225CCF93F57191B (gym_event_id), INDEX IDX_6225CCF9A76ED395 (user_id), PRIMARY KEY(gym_event_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE event_participants ADD CONSTRAINT FK_9C7A7A6171F7E88B FOREIGN KEY (event_id) REFERENCES event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event_participants ADD CONSTRAINT FK_9C7A7A61A76ED395 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE gym_event_participants ADD CONSTRAINT FK_6225CCF93F57191B FOREIGN KEY (gym_event_id) REFERENCES gym_event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE gym_event_participants ADD CONSTRAINT FK_6225CCF9A76ED395 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE event_participant');
        $this->addSql('ALTER TABLE event ADD created_by_id INT DEFAULT NULL, DROP creator_first_name, DROP creator_last_name, DROP creator_email');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7B03A8386 FOREIGN KEY (created_by_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE event DROP end_time');
        $this->addSql('ALTER TABLE event DROP creator_phone_number');
        $this->addSql('ALTER TABLE gym_event DROP creator_phone_number');
        $this->addSql('CREATE INDEX IDX_3BAE0AA7B03A8386 ON event (created_by_id)');
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE event_participant (id INT AUTO_INCREMENT NOT NULL, event_id INT DEFAULT NULL, first_name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, last_name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, email VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, phone_number VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, photo VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, INDEX IDX_7C16B89171F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE event_participant ADD CONSTRAINT FK_7C16B89171F7E88B FOREIGN KEY (event_id) REFERENCES event (id)');
        $this->addSql('DROP TABLE event_participants');
        $this->addSql('DROP TABLE gym_event_participants');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7B03A8386');
        $this->addSql('DROP INDEX IDX_3BAE0AA7B03A8386 ON event');
        $this->addSql('ALTER TABLE event ADD creator_first_name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, ADD creator_last_name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, ADD creator_email VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, DROP created_by_id');
        $this->addSql('ALTER TABLE event ADD end_time TIME NOT NULL');
        $this->addSql('ALTER TABLE event ADD creator_phone_number VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE gym_event ADD creator_phone_number VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
    }
}
