<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20190324113523 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE gym_event_participant (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, gym_event_id INT DEFAULT NULL, is_confirmed TINYINT(1) DEFAULT \'0\' NOT NULL, INDEX IDX_F7BB5609A76ED395 (user_id), INDEX IDX_F7BB56093F57191B (gym_event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE gym_event_participant ADD CONSTRAINT FK_F7BB5609A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE gym_event_participant ADD CONSTRAINT FK_F7BB56093F57191B FOREIGN KEY (gym_event_id) REFERENCES gym_event (id)');
        $this->addSql('DROP TABLE gym_event_participants');
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE gym_event_participants (gym_event_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_6225CCF93F57191B (gym_event_id), INDEX IDX_6225CCF9A76ED395 (user_id), PRIMARY KEY(gym_event_id, user_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE gym_event_participants ADD CONSTRAINT FK_6225CCF93F57191B FOREIGN KEY (gym_event_id) REFERENCES gym_event (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE gym_event_participants ADD CONSTRAINT FK_6225CCF9A76ED395 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE gym_event_participant');
    }
}
