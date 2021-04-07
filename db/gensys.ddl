CREATE TABLE entity
(
    id                serial primary key,
    --num             INTEGER NOT NULL, -- don't call this id, since it's a compound pk, and it confuses twistar
    --domain          TEXT NOT NULL,
    parent_id         INTEGER,
    type              TEXT NOT NULL,
    name              text,
    fields            JSONB,
    last_updated_by   integer,
    last_updated_date timestamp,
    FOREIGN KEY (parent_id) REFERENCES entity (id) ON DELETE CASCADE
);

CREATE TABLE link
(
    id        serial primary key,
    src_id    INTEGER NOT NULL,
    tgt_id    INTEGER NOT NULL,
    link_type TEXT,
    FOREIGN KEY (src_id) REFERENCES entity (id) ON DELETE CASCADE,
    FOREIGN KEY (tgt_id) REFERENCES entity (id) ON DELETE CASCADE,
    CONSTRAINT link_uq UNIQUE (tgt_id, link_type)
);
