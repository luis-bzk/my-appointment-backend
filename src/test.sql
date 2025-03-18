delete from core.core_user
where
  use_id = $1
returning
  *;