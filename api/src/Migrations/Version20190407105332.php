<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20190407105332 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE gym_court ADD new TINYINT(1) DEFAULT \'1\' NOT NULL');
        $this->addSql('ALTER TABLE court ADD new TINYINT(1) DEFAULT \'1\' NOT NULL');
        $this->addSql('ALTER TABLE users CHANGE roles roles INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE court DROP new');
        $this->addSql('ALTER TABLE gym_court DROP new');
        $this->addSql('ALTER TABLE users CHANGE roles roles INT NOT NULL');
    }
}
