<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20190226124841 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE gym_event (id INT AUTO_INCREMENT NOT NULL, created_by_id INT DEFAULT NULL, gym_court_id INT DEFAULT NULL, price DOUBLE PRECISION DEFAULT NULL, creator_phone_number VARCHAR(255) DEFAULT NULL, name VARCHAR(255) NOT NULL, date DATE NOT NULL, start_time TIME NOT NULL, end_time TIME NOT NULL, needed_players INT NOT NULL, comment VARCHAR(255) DEFAULT NULL, INDEX IDX_872118C5B03A8386 (created_by_id), INDEX IDX_872118C5ADB8B199 (gym_court_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE gym_event ADD CONSTRAINT FK_872118C5B03A8386 FOREIGN KEY (created_by_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE gym_event ADD CONSTRAINT FK_872118C5ADB8B199 FOREIGN KEY (gym_court_id) REFERENCES gym_court (id)');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7ADB8B199');
        $this->addSql('DROP INDEX IDX_3BAE0AA7ADB8B199 ON event');
        $this->addSql('ALTER TABLE event DROP gym_court_id');
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE gym_event');
        $this->addSql('ALTER TABLE event ADD gym_court_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7ADB8B199 FOREIGN KEY (gym_court_id) REFERENCES gym_court (id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA7ADB8B199 ON event (gym_court_id)');
    }
}
