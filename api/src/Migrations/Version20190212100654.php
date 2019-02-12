<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20190212100654 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE event ADD gym_court_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7ADB8B199 FOREIGN KEY (gym_court_id) REFERENCES gym_court (id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA7ADB8B199 ON event (gym_court_id)');
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7ADB8B199');
        $this->addSql('DROP INDEX IDX_3BAE0AA7ADB8B199 ON event');
        $this->addSql('ALTER TABLE event DROP gym_court_id');
    }
}
