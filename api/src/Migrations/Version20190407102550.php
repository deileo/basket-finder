<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20190407102550 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE permission ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE event ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE gym_court ADD user_id INT DEFAULT NULL, ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE gym_court ADD CONSTRAINT FK_DF210B5DA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_DF210B5DA76ED395 ON gym_court (user_id)');
        $this->addSql('ALTER TABLE court ADD user_id INT DEFAULT NULL, ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE court ADD CONSTRAINT FK_63AE193FA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_63AE193FA76ED395 ON court (user_id)');
        $this->addSql('ALTER TABLE users ADD deleted_at DATETIME DEFAULT NULL, CHANGE roles roles INT NOT NULL');
        $this->addSql('ALTER TABLE gym_event_participant ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE gym_event ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE court DROP FOREIGN KEY FK_63AE193FA76ED395');
        $this->addSql('DROP INDEX IDX_63AE193FA76ED395 ON court');
        $this->addSql('ALTER TABLE court DROP user_id, DROP created_at, DROP updated_at, DROP deleted_at');
        $this->addSql('ALTER TABLE event DROP created_at, DROP updated_at, DROP deleted_at');
        $this->addSql('ALTER TABLE gym_court DROP FOREIGN KEY FK_DF210B5DA76ED395');
        $this->addSql('DROP INDEX IDX_DF210B5DA76ED395 ON gym_court');
        $this->addSql('ALTER TABLE gym_court DROP user_id, DROP created_at, DROP updated_at, DROP deleted_at');
        $this->addSql('ALTER TABLE gym_event DROP created_at, DROP updated_at, DROP deleted_at');
        $this->addSql('ALTER TABLE gym_event_participant DROP created_at, DROP updated_at, DROP deleted_at');
        $this->addSql('ALTER TABLE permission DROP created_at, DROP updated_at, DROP deleted_at');
        $this->addSql('ALTER TABLE users DROP deleted_at, CHANGE roles roles INT NOT NULL');
    }
}
