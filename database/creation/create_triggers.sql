
create or replace function check_user_validation() returns TRIGGER as $example_table$
    begin
        set new.status = '0';
        if new.account_type == 'S' then
            if new.login = null then
                rollback;
                raise exception 'when user doesnt use auth account it need a login';
            elsif new.password = null then
                rollback;
                raise exception 'when user doesnt use auth account it need a password';
            end if;
        elsif not(new.account_type == 'F' OR new.account_type == 'G') then
                rollback;
                raise exception 'when user is not STANDARD it need to use google or facebook';
        end if;

      RETURN NEW;

    end;
$example_table$ language plpgsql;

create trigger register_user before insert or update on users
 for each row execute procedure check_user_validation();

