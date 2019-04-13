<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20190413120840 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE event_comment (id INT AUTO_INCREMENT NOT NULL, event_id INT DEFAULT NULL, created_by_id INT DEFAULT NULL, comment VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_1123FBC371F7E88B (event_id), INDEX IDX_1123FBC3B03A8386 (created_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE gym_court_comment (id INT AUTO_INCREMENT NOT NULL, gym_court_id INT DEFAULT NULL, created_by_id INT DEFAULT NULL, comment VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_EB4D3FE7ADB8B199 (gym_court_id), INDEX IDX_EB4D3FE7B03A8386 (created_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE court_comment (id INT AUTO_INCREMENT NOT NULL, court_id INT DEFAULT NULL, created_by_id INT DEFAULT NULL, comment VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_B31356DEE3184009 (court_id), INDEX IDX_B31356DEB03A8386 (created_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE gym_event_comment (id INT AUTO_INCREMENT NOT NULL, gym_event_id INT DEFAULT NULL, created_by_id INT DEFAULT NULL, comment VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_497D92FA3F57191B (gym_event_id), INDEX IDX_497D92FAB03A8386 (created_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE event_comment ADD CONSTRAINT FK_1123FBC371F7E88B FOREIGN KEY (event_id) REFERENCES event (id)');
        $this->addSql('ALTER TABLE event_comment ADD CONSTRAINT FK_1123FBC3B03A8386 FOREIGN KEY (created_by_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE gym_court_comment ADD CONSTRAINT FK_EB4D3FE7ADB8B199 FOREIGN KEY (gym_court_id) REFERENCES gym_court (id)');
        $this->addSql('ALTER TABLE gym_court_comment ADD CONSTRAINT FK_EB4D3FE7B03A8386 FOREIGN KEY (created_by_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE court_comment ADD CONSTRAINT FK_B31356DEE3184009 FOREIGN KEY (court_id) REFERENCES court (id)');
        $this->addSql('ALTER TABLE court_comment ADD CONSTRAINT FK_B31356DEB03A8386 FOREIGN KEY (created_by_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE gym_event_comment ADD CONSTRAINT FK_497D92FA3F57191B FOREIGN KEY (gym_event_id) REFERENCES gym_event (id)');
        $this->addSql('ALTER TABLE gym_event_comment ADD CONSTRAINT FK_497D92FAB03A8386 FOREIGN KEY (created_by_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE users CHANGE roles roles INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE event_comment');
        $this->addSql('DROP TABLE gym_court_comment');
        $this->addSql('DROP TABLE court_comment');
        $this->addSql('DROP TABLE gym_event_comment');
        $this->addSql('ALTER TABLE users CHANGE roles roles INT NOT NULL');
    }
}
