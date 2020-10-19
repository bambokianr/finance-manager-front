create or replace function generate_string(num int)
returns text
language plpgsql
    as
    $$
        declare
            chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,' ||
                            '       V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
            result text = '';
            i int := 0;
            n int := num;
        begin
            if num < 0 then
                raise exception 'num has to be bigger than zero';
            end if;
            for i in 1..num loop
                result := result || chars[1+random()*(array_length(chars, 1)-1)];
              end loop;
            return result;
        end;
    $$;


select generate_string(10);