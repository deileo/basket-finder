//Menu
export const OPEN_MENU = 'open_menu';
export const CLOSE_MENU = 'close_menu';

//Loader
export const LOADING_MAP_STARTED = 'loading_map_started';
export const LOADING_MAP_ENDED = 'loading_map_ended';
export const LOADING_EVENTS_STARTED = 'loading_events_strated';
export const LOADING_EVENTS_ENDED = 'loading_events_ended';
export const LOADING_COMMENTS_STARTED = 'loading_comments_started';
export const LOADING_COMMENTS_ENDED = 'loading_comments_ended';

//Court
export const FETCH_COURTS = 'fetch_courts';
export const FETCH_COURT = 'fetch_court';
export const CHANGE_COURT_TYPE = 'change_court_type';
export const TYPE_COURT = 'court';
export const TYPE_GYM_COURT = 'gym-court';
export const FETCH_ADMIN_GYM_COURTS = 'fetch-admin-gym-courts';
export const FETCH_ADMIN_COURTS = 'fetch-admin-courts';
export const FETCH_ADMIN_NEW_COURTS = 'fetch_admin_new_courts';
export const RELOAD_COURTS_TYPE = 'reload_courts_type';
export const RESET_RELOAD_COURTS_TYPE = 'reset_reload_courts_type';
export const CREATE_COURT_ERROR = 'create_court_error';
export const CREATE_COURT = 'create_court';

//Event
export const CREATE_EVENT = 'event_create';
export const EDIT_EVENT = 'edit_event';
export const CREATE_EVENT_ERROR = 'event_create_error';
export const JOIN_EVENT = 'event_join';
export const LEAVE_EVENT = 'event_leave';
export const GET_EVENTS = 'get_events';
export const RESET_EVENT_CREATION = 'reset_event_creation';
export const REMOVE_EVENT_ERRORS = 'remove_event_errors';
export const GET_USER_CREATED_EVENTS = 'get_user_created_events';
export const GET_USER_JOINED_EVENTS = 'get_user_joined_events';
export const DELETE_EVENT = 'delete_event';
export const RELOAD_EVENTS = 'reload_events';

//Flash
export const FLASH_MESSAGE = 'flash_message';

//Modal
export const CREATE_EVENT_MODAL_OPENED = 'create_event_modal_opened';
export const CREATE_EVENT_MODAL_CLOSED = 'create_event_modal_closed';
export const CREATE_GYM_EVENT_MODAL_OPENED = 'create_gym_event_modal_opened';

//user
export const GET_USER = 'get_user';
export const GET_USERS = 'get_users';
export const RESET_RELOAD_USER_TYPE = 'reset_reload_user_type';
export const DISABLE_USER = 'disable_user';
export const ENABLE_USER = 'enable_user';

// participants
export const GET_PARTICIPANTS_UNCONFIRMED = 'unconfirmed_participants';
export const GET_EVENT_PARTICIPANTS = 'get_event_participants';
export const ACCEPT_PARTICIPANT = 'accept_participant';
export const CANCEL_PARTICIPANT = 'cancle_participant';

// permission request
export const PERMISSION_REQUEST_CREATED = 'permission_request_created';
export const PERMISSION_REQUEST_ERRORS = 'permission_request_errors';
export const PERMISSION_GYM_COURT = 'permission_gym_court';
export const PERMISSIONS_ALL = 'permissions_all';
export const RESET_CREATED_REQUEST = 'reset_created_request';
export const PERMISSION_REQUEST_APPROVED = 'permission_request_approved';
export const PERMISSION_DELETE = 'permission_delete';

// comment
export const NEW_COMMENT = 'new_comment';
export const GET_COMMENTS = 'get_comment';
export const RESET_COMMENT_RELOAD = 'reset_comment_reload';
