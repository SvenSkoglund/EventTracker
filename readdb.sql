-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema readdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `readdb` ;

-- -----------------------------------------------------
-- Schema readdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `readdb` DEFAULT CHARACTER SET utf8 ;
USE `readdb` ;

-- -----------------------------------------------------
-- Table `readdb`.`read_event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `readdb`.`read_event` ;

CREATE TABLE IF NOT EXISTS `readdb`.`read_event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `author` VARCHAR(45) NULL,
  `format` ENUM('Audio', 'Text') NULL,
  `hours` DOUBLE NOT NULL,
  `is_fiction` TINYINT NOT NULL,
  `date` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_UNIQUE` ON `readdb`.`read_event` (`id` ASC);

SET SQL_MODE = '';
GRANT USAGE ON *.* TO readuser@localhost;
 DROP USER readuser@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'readuser'@'localhost' IDENTIFIED BY 'readuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE `readdb`.* TO 'readuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `readdb`.`read_event`
-- -----------------------------------------------------
START TRANSACTION;
USE `readdb`;
INSERT INTO `readdb`.`read_event` (`id`, `title`, `author`, `format`, `hours`, `is_fiction`, `date`) VALUES (1, 'Mind Illuminated', 'Culudasa', 'Audio', 1, 0, '2018-05-11');
INSERT INTO `readdb`.`read_event` (`id`, `title`, `author`, `format`, `hours`, `is_fiction`, `date`) VALUES (2, 'Mind Illuminated', 'Culudasa', 'Audio', 1, 0, '2018-05-10');
INSERT INTO `readdb`.`read_event` (`id`, `title`, `author`, `format`, `hours`, `is_fiction`, `date`) VALUES (3, '12 Rules for Life', 'Jordan Peterson', 'Audio', 1, 0, '2018-05-11');
INSERT INTO `readdb`.`read_event` (`id`, `title`, `author`, `format`, `hours`, `is_fiction`, `date`) VALUES (4, 'Clean Code', 'Bob Martin', 'Audio', 1, 0, '2018-05-11');

COMMIT;
