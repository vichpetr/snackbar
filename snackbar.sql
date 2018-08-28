create table if not exists avatar (
  id tinyint unsigned auto_increment primary key,
  name varchar(32) not null,
  email varchar(128) not null,
  pictype varchar(3),
  pic longblob);


create table if not exists snack (
  id tinyint unsigned auto_increment primary key,
  name varchar(32) not null,
  price tinyint unsigned not null,
  owner tinyint unsigned not null,
  CONSTRAINT `fk_owner_id`
		FOREIGN KEY (owner) REFERENCES avatar (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
  INDEX(owner),
  pictype varchar(3),
  pic longblob);

create table if not exists transaction (
  id int unsigned auto_increment primary key,
  buyer tinyint unsigned not null,
  CONSTRAINT `fk_buyer_id`
		FOREIGN KEY (buyer) REFERENCES avatar (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
  INDEX (buyer),
  snack tinyint unsigned not null,
  CONSTRAINT `fk_snack_id`
		FOREIGN KEY (snack) REFERENCES snack (id)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
  INDEX (snack),
  transaction_date timestamp default CURRENT_TIMESTAMP,
  INDEX (transaction_date),
  paid bool default false,
  INDEX (paid)
);
