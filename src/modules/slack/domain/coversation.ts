export type Conversation = {
  id: string;
  created: number;
  creator: string;
  is_org_shared: boolean;
  is_im: boolean;
  context_team_id: string;
  updated: number;
  name: string;
  name_normalized: string;
  is_channel: boolean;
  is_group: boolean;
  is_mpim: boolean;
  is_private: boolean;
  is_archived: boolean;
  is_general: boolean;
  is_shared: boolean;
  is_ext_shared: boolean;
  unlinked: number;
  is_pending_ext_shared: boolean;
  pending_shared: any[];
  parent_conversation: string | null;
  purpose: {
    value: string;
    creator: string;
    last_set: number;
  };
  topic: {
    value: string;
    creator: string;
    last_set: number;
  };
  shared_team_ids: string[];
  pending_connected_team_ids: string[];
  is_member: boolean;
  num_members: number;
  properties: {
    tabs: [
      {
        id: string;
        label: string;
        type: "list" | string;
        data: {
          file_id: string;
          shared_ts: string;
          bot_user_id: string;
          mute_edit_updates: boolean;
        };
      }
    ];
    tabz: [
      {
        id: string;
        label: string;
        type: "list" | string;
        data: {
          file_id: string;
          shared_ts: string;
          bot_user_id: string;
          mute_edit_updates: boolean;
        };
      }
    ];
    use_case: "project" | string;
  };
  previous_names: string[];
};
