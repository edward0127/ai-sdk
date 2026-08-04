// AUTO-GENERATED. Do not edit by hand.
// Source: docs/nitrosend.mcp.json
// Regenerate with: npm run generate:schemas

import { z } from 'zod';

type NitroComposeFlowFilterNode = {
    name: string;
    predicate: "eq" | "not_eq" | "cont" | "not_cont" | "start" | "not_start" | "end" | "not_end" | "gt" | "lt" | "gteq" | "lteq" | "present" | "blank" | "true" | "false" | "in" | "not_in" | "within_days" | "not_within_days";
    value: unknown;
    [key: string]: unknown;
  } |
  {
    type: "event";
    event: string;
    predicate: "performed" | "not_performed" | "count_at_least" | "count_at_most";
    value?: number;
    within_days?: number;
    since?: string;
    [key: string]: unknown;
  } |
  {
    op: "and" | "or" | "not";
    conditions: Array<NitroComposeFlowFilterNode>;
    [key: string]: unknown;
  };
type NitroComposeFlowFlowStep = {
    action_name?: string;
    key?: string;
    type: "email" | "sms" | "wait" | "split" | "emit_event" | "webhook" | "subscribe" | "unsubscribe";
    subject?: string;
    body?: string;
    plain_text_mode?: "derived" | "custom";
    preheader?: string;
    from_name?: string;
    from_email?: string;
    reply_to?: string;
    design?: Record<string, unknown>;
    if_version?: number;
    template_version?: number;
    bcc?: string;
    duration?: number;
    event_name?: string;
    event_data?: Record<string, unknown>;
    event_data_keys?: Array<string>;
    forward_event_data: boolean;
    url?: string;
    endpoint_configured?: boolean;
    method: "POST" | "PUT";
    headers?: Record<string, unknown>;
    filters?: Array<NitroComposeFlowFilterNode> |
    NitroComposeFlowFilterNode;
    yes?: Array<NitroComposeFlowFlowStep>;
    no?: Array<NitroComposeFlowFlowStep>;
    channel: "phone" | "email" | "all";
  };
type NitroDefineSegmentFilterNode = {
    name: string;
    predicate: "eq" | "not_eq" | "cont" | "not_cont" | "start" | "not_start" | "end" | "not_end" | "gt" | "lt" | "gteq" | "lteq" | "present" | "blank" | "true" | "false" | "in" | "not_in" | "within_days" | "not_within_days";
    value: unknown;
    [key: string]: unknown;
  } |
  {
    type: "event";
    event: string;
    predicate: "performed" | "not_performed" | "count_at_least" | "count_at_most";
    value?: number;
    within_days?: number;
    since?: string;
    [key: string]: unknown;
  } |
  {
    op: "and" | "or" | "not";
    conditions: Array<NitroDefineSegmentFilterNode>;
    [key: string]: unknown;
  };

const NitroComposeFlowFilterNodeSchema: z.ZodType<NitroComposeFlowFilterNode> = z.lazy(() => z.union([
    z.object({
      name: z.string().describe("Filter name from the supplied filter schema"),
      predicate: z.enum(["eq", "not_eq", "cont", "not_cont", "start", "not_start", "end", "not_end", "gt", "lt", "gteq", "lteq", "present", "blank", "true", "false", "in", "not_in", "within_days", "not_within_days"]).describe("Ransack predicate or special predicate (within_days, not_within_days)"),
      value: z.unknown().describe("Filter value — string, number, boolean, or array. For present/blank/true/false predicates, pass true.")
    }).passthrough(),
    z.object({
      type: z.literal("event"),
      event: z.string().describe("Event name, e.g. first_send or project_created"),
      predicate: z.enum(["performed", "not_performed", "count_at_least", "count_at_most"]),
      value: z.number().int().describe("Required for count_at_least/count_at_most").optional(),
      within_days: z.number().int().describe("Optional rolling recency window").optional(),
      since: z.iso.datetime().describe("Optional absolute recency cutoff").optional()
    }).passthrough(),
    z.object({
      op: z.enum(["and", "or", "not"]),
      conditions: z.array(NitroComposeFlowFilterNodeSchema).max(25)
    }).passthrough()
  ]));
const NitroComposeFlowFlowStepSchema: z.ZodType<NitroComposeFlowFlowStep> = z.lazy(() => z.object({
    action_name: z.string().describe("Stable persisted action identity. Copy exactly for existing-flow email patches; omit for new nodes.").optional(),
    key: z.string().describe("Optional scaffold identity for a new node. Keep it when retaining that scaffold node; omit it for a genuinely new node.").optional(),
    type: z.enum(["email", "sms", "wait", "split", "emit_event", "webhook", "subscribe", "unsubscribe"]),
    subject: z.string().describe("Email subject line (email steps)").optional(),
    body: z.string().describe("SMS body text (sms steps) or email plain text").optional(),
    plain_text_mode: z.enum(["derived", "custom"]).describe("Email text-alternative authority returned by the composition scaffold: derived from design or custom body.").optional(),
    preheader: z.string().describe("Email preheader (email steps)").optional(),
    from_name: z.string().describe("Sender name override (new-flow email steps only)").optional(),
    from_email: z.string().describe("Sender email override (new-flow email steps only)").optional(),
    reply_to: z.string().describe("Reply-to override (new-flow email steps only)").optional(),
    design: z.object({}).passthrough().describe("Email design: { sections: [...], theme: {...} }. Theme overrides support brand_color, bg_color, text_color, font_body, font_heading, heading_size, body_size, radius, spacing_density, button_background_color, button_text_color, button_padding, and logo_url.").optional(),
    if_version: z.number().int().describe("Required optimistic concurrency token for an existing-flow email patch.").optional(),
    template_version: z.number().int().describe("Read-only backing template version returned by Nitrosend.").optional(),
    bcc: z.string().describe("Optional BCC for a new-flow email step. Never return it in an existing-flow creative patch.").optional(),
    duration: z.number().int().describe("Wait duration in seconds (wait steps)").optional(),
    event_name: z.string().describe("Event name to fire (emit_event steps). Lowercase alphanumeric with underscores.").optional(),
    event_data: z.object({}).passthrough().describe("Static data payload for emitted event (emit_event steps)").optional(),
    event_data_keys: z.array(z.string()).describe("Contract-only non-secret event-data key list. Copy exactly from next_call.").optional(),
    forward_event_data: z.boolean().default(false).describe("Merge triggering event data into emitted event (emit_event steps)"),
    url: z.string().describe("Webhook URL (webhook steps). Supports merge tags.").optional(),
    endpoint_configured: z.boolean().describe("Contract-only non-secret webhook marker. Copy exactly from next_call; the server restores the URL and credentials.").optional(),
    method: z.enum(["POST", "PUT"]).default("POST").describe("HTTP method (webhook steps)"),
    headers: z.object({}).passthrough().describe("Custom HTTP headers as key-value pairs (webhook steps)").optional(),
    filters: z.union([
      z.array(NitroComposeFlowFilterNodeSchema),
      NitroComposeFlowFilterNodeSchema
    ]).describe("Split condition filters. Use a flat array for simple AND filters, or a boolean tree group: {op: \"and\"|\"or\"|\"not\", conditions: [...]}.").optional(),
    yes: z.array(NitroComposeFlowFlowStepSchema).describe("Steps for the yes branch").optional(),
    no: z.array(NitroComposeFlowFlowStepSchema).describe("Steps for the no branch").optional(),
    channel: z.enum(["phone", "email", "all"]).default("phone").describe("Channel for subscribe/unsubscribe steps")
  }).strict());
const NitroDefineSegmentFilterNodeSchema: z.ZodType<NitroDefineSegmentFilterNode> = z.lazy(() => z.union([
    z.object({
      name: z.string().describe("Filter name from the supplied filter schema"),
      predicate: z.enum(["eq", "not_eq", "cont", "not_cont", "start", "not_start", "end", "not_end", "gt", "lt", "gteq", "lteq", "present", "blank", "true", "false", "in", "not_in", "within_days", "not_within_days"]).describe("Ransack predicate or special predicate (within_days, not_within_days)"),
      value: z.unknown().describe("Filter value — string, number, boolean, or array. For present/blank/true/false predicates, pass true.")
    }).passthrough(),
    z.object({
      type: z.literal("event"),
      event: z.string().describe("Event name, e.g. first_send or project_created"),
      predicate: z.enum(["performed", "not_performed", "count_at_least", "count_at_most"]),
      value: z.number().int().describe("Required for count_at_least/count_at_most").optional(),
      within_days: z.number().int().describe("Optional rolling recency window").optional(),
      since: z.iso.datetime().describe("Optional absolute recency cutoff").optional()
    }).passthrough(),
    z.object({
      op: z.enum(["and", "or", "not"]),
      conditions: z.array(NitroDefineSegmentFilterNodeSchema).max(25)
    }).passthrough()
  ]));

export const nitrosendToolSchemas = {
  nitro_compose_campaign: z.object({
    name: z.string().describe("Campaign name").optional(),
    mode: z.enum(["create", "patch", "replace"]).default("create").describe("create: new campaign; patch: update provided fields on an existing draft campaign; replace: replace existing draft content/audience/schedule and requires confirm: true. Replace clears omitted audience/schedule. Patch/replace cannot change channel."),
    campaign_id: z.number().int().describe("Required for patch/replace modes").optional(),
    channel: z.enum(["email", "sms"]).default("email").describe("Auto-detected as 'email' when sections or template_id provided. Set explicitly to 'sms' for SMS campaigns. Immutable after campaign creation."),
    goal: z.string().describe("Goal for the campaign authoring contract").optional(),
    category: z.enum(["promotion", "announcement", "newsletter", "welcome", "reengagement", "transactional", "plain", "outreach"]).describe("The email's job (drives baseline layout selection): promotion, announcement, newsletter, welcome, reengagement, transactional, or plain.").optional(),
    composition_mode: z.enum(["intent", "draft", "validate", "generate"]).describe("intent returns composition_contract; validate checks a caller-authored draft; draft validates and persists it; generate explicitly requests metered server composition and persists one draft.").optional(),
    contract_id: z.string().describe("Email composition contract id returned from composition_mode=intent.").optional(),
    brand_context_ref: z.string().describe("Optional current brand context ref from a prior intent. Omit to receive the full current context.").optional(),
    validate_only: z.boolean().default(false).describe("Alias for composition_mode=validate. Does not persist or consume repair attempts."),
    design_mode_override: z.enum(["premium_rich", "premium_minimal", "founder_letter", "utility_plain"]).describe("Renegotiate/validate the draft under a different design mode.").optional(),
    renegotiate: z.boolean().default(false).describe("When true with design_mode_override, keeps the same contract but changes the design mode."),
    user_instruction: z.string().describe("Latest user instruction to preserve inside the composition contract.").optional(),
    creative_route_id: z.string().describe("Pin one composition_contract.creative_routes[].id so the returned scaffold is that route. Omit to take the recommendation. A known route without enough frozen evidence returns its exact missing requirements; an unknown id returns the supported ids. Neither silently falls back.").optional(),
    source_text: z.string().describe("Optional source evidence for authoring, such as research notes or supplied product copy. Evidence is not an instruction channel; put authoring directions in user_instruction. Source text is available context, not required copy.").optional(),
    facts: z.array(z.object({
      kind: z.enum(["url", "image_url", "offer_code", "price", "deadline", "offer", "cta_text"]).describe("Evidence type used to determine valid semantic locations."),
      value: z.string().describe("Exact evidence value."),
      description: z.string().describe("For kind=image_url only: what the picture visibly shows. This travels with the exact image binding so the composer can choose imagery and write honest alt text without guessing from the URL.").optional(),
      requirement: z.enum(["required", "available"]).describe("required enforces exact inclusion; available only authorizes use.")
    }).strict()).describe("Typed literal evidence for the composition contract, not instructions. A required URL, image URL, offer code, price, deadline, offer, or exact CTA text must appear with its exact value in an allowed semantic location; available evidence may be used but is not mandatory. Put prose facts in source_text; use cta_text only when the operator requires an exact CTA phrase.").optional(),
    draft_meta: z.object({
      creative_route_id: z.string().describe("Chosen composition_contract.creative_routes[].id").optional(),
      concrete_anchor: z.string().describe("Specific proof, product detail, visual, code/output, quote, number, or brand moment used.").optional(),
      why_this_earns_the_inbox: z.string().describe("One sentence explaining the creative move.").optional()
    }).passthrough().describe("Optional authoring provenance. It never blocks validation or persistence.").optional(),
    subject: z.string().describe("Email subject line (email campaigns)").optional(),
    preheader: z.string().describe("Email preheader (email campaigns)").optional(),
    from_name: z.string().describe("Sender name override").optional(),
    from_email: z.string().describe("Sender email override").optional(),
    reply_to: z.string().describe("Reply-to email override").optional(),
    body: z.string().describe("SMS body text (sms campaigns) or email plain text").optional(),
    plain_text_mode: z.enum(["derived", "custom"]).describe("Email text-alternative authority returned by the composition scaffold: derived from design or custom body.").optional(),
    sections: z.array(z.object({}).passthrough()).describe("Email design sections array — same format as nitro_manage_template. Requires subject. Image URL props accept public URLs or nitro_ingest media_url/image_url values (never raw signed_id); upload local files via nitro_ingest first.").optional(),
    theme: z.object({}).passthrough().describe("Email theme overrides merged on brand theme: {brand_color, bg_color, text_color, font_body, font_heading, heading_size, body_size, radius, spacing_density, button_background_color, button_text_color, button_padding, logo_url}. logo_url must be a public URL or nitro_ingest media_url/image_url, never raw signed_id.").optional(),
    template_id: z.number().int().describe("Clone design from existing template (email campaigns)").optional(),
    if_version: z.number().int().describe("Optimistic concurrency token for patch/replace writes to an existing campaign template.").optional(),
    audience: z.object({
      audience_type: z.enum(["lists", "segment", "all_contacts"]).describe("Explicit audience target: lists, segment, or all_contacts").optional(),
      contact_list_ids: z.array(z.number().int()).describe("Send to contacts in these lists (union with dedup)").optional(),
      contact_list_id: z.number().int().describe("Deprecated — use contact_list_ids. Send to contacts in this list").optional(),
      segment_id: z.number().int().describe("Filter trigger to contacts matching this segment").optional(),
      exclude_segment_ids: z.array(z.number().int()).describe("Suppress contacts matching any of these segments (warmup suppression). Pass [] to clear; omit in patch mode to preserve.").optional(),
      exclude_contact_list_ids: z.array(z.number().int()).describe("Suppress contacts who are members of any of these lists (warmup suppression). Pass [] to clear; omit in patch mode to preserve.").optional()
    }).passthrough().describe("Target audience for the campaign. Use audience_type='all_contacts' only for an explicit all-subscribed-contacts send.").optional(),
    scheduled_at: z.iso.datetime().describe("ISO 8601 delivery time (e.g. '2026-03-01T10:00:00Z'). Omit for manual send.").optional(),
    dry_run: z.boolean().default(false).describe("Preview campaign without creating (default: false)"),
    idempotency_key: z.string().max(128).describe("Required for every non-dry-run persistence mutation, including SMS create, unchanged-template clone, patch, and replace. Contract draft next_calls supply the exact stable key. Reuse a contract-free caller key only for an exact retry.").optional(),
    confirm: z.boolean().default(false).describe("Required for replace mode")
  }).strict(),
  nitro_compose_flow: z.object({
    name: z.string().describe("Flow name (required for create mode)").optional(),
    mode: z.enum(["create", "replace", "patch"]).default("create").describe("create: new complete graph; replace: complete existing draft graph; patch: name and/or selected email actions"),
    flow_id: z.number().int().describe("Required for replace/patch modes").optional(),
    expected_updated_at: z.string().describe("Presentation-level compatibility token. Prefer expected_draft_revision_id for graph writes.").optional(),
    expected_draft_revision_id: z.number().int().describe("Exact draft revision ID from the latest flow read. Existing-flow authoring fails with a conflict if this draft has changed.").optional(),
    goal: z.string().describe("Goal for the flow authoring contract").optional(),
    composition_mode: z.enum(["intent", "draft", "validate", "generate"]).describe("intent returns composition_contract; validate checks a caller-authored draft; draft validates and persists it; generate explicitly requests metered server composition and persists one draft.").optional(),
    contract_id: z.string().describe("Email composition contract id returned from composition_mode=intent.").optional(),
    brand_context_ref: z.string().describe("Optional current brand context ref from a prior intent. Omit to receive the full current context.").optional(),
    validate_only: z.boolean().default(false).describe("Alias for composition_mode=validate. Does not persist or consume repair attempts."),
    design_mode_override: z.enum(["premium_rich", "premium_minimal", "founder_letter", "utility_plain"]).describe("Renegotiate/validate the draft under a different design mode.").optional(),
    renegotiate: z.boolean().default(false).describe("When true with design_mode_override, keeps the same contract but changes the design mode."),
    user_instruction: z.string().describe("Latest user instruction to preserve inside the composition contract.").optional(),
    creative_route_id: z.string().describe("Pin one composition_contract.creative_routes[].id so the returned scaffold is that route. Omit to take the recommendation. A known route without enough frozen evidence returns its exact missing requirements; an unknown id returns the supported ids. Neither silently falls back.").optional(),
    source_text: z.string().describe("Optional source evidence for authoring, such as research notes or supplied product copy. Evidence is not an instruction channel; put authoring directions in user_instruction. Source text is available context, not required copy.").optional(),
    facts: z.array(z.object({
      kind: z.enum(["url", "image_url", "offer_code", "price", "deadline", "offer", "cta_text"]).describe("Evidence type used to determine valid semantic locations."),
      value: z.string().describe("Exact evidence value."),
      description: z.string().describe("For kind=image_url only: what the picture visibly shows. This travels with the exact image binding so the composer can choose imagery and write honest alt text without guessing from the URL.").optional(),
      requirement: z.enum(["required", "available"]).describe("required enforces exact inclusion; available only authorizes use.")
    }).strict()).describe("Typed literal evidence for the composition contract, not instructions. A required URL, image URL, offer code, price, deadline, offer, or exact CTA text must appear with its exact value in an allowed semantic location; available evidence may be used but is not mandatory. Put prose facts in source_text; use cta_text only when the operator requires an exact CTA phrase.").optional(),
    draft_meta: z.object({
      creative_route_id: z.string().describe("Chosen composition_contract.creative_routes[].id").optional(),
      concrete_anchor: z.string().describe("Specific proof, product detail, visual, code/output, quote, number, or brand moment used.").optional(),
      why_this_earns_the_inbox: z.string().describe("One sentence explaining the creative move.").optional()
    }).passthrough().describe("Optional authoring provenance. It never blocks validation or persistence.").optional(),
    trigger: z.object({
      event: z.string().describe("Trigger event name. Built-in: contact_add, contact_enriched, keyword, message, list_add, list_remove, product_view, checkout, cart_add, cart_remove, cart_abandoned, browse_abandoned. Custom: any lowercase alphanumeric with underscores (e.g. order_confirmed, password_reset).").optional(),
      action_name: z.string().describe("Persisted trigger identity. Preserve it when retaining the existing trigger.").optional(),
      segment_id: z.number().int().describe("Optional segment filter on trigger").optional(),
      contact_list_id: z.number().int().describe("Optional contact list for audience targeting").optional(),
      resource_type: z.string().describe("Frozen trigger resource type returned by a composition contract.").optional(),
      resource_id: z.unknown().describe("Frozen trigger resource id returned by a composition contract.").optional(),
      data: z.object({}).passthrough().describe("Event-specific config (e.g. {keywords: ['STOP']})").optional()
    }).passthrough().optional(),
    steps: z.array(NitroComposeFlowFlowStepSchema).describe("Ordered array of flow steps. Required props per type:\n\n- **email** — subject (required), design ({sections, theme}) or body, preheader, from_name, from_email, reply_to, bcc (string, optional BCC email address). Theme supports the same override keys taught by the email design schema.\n- **sms** — body (required)\n- **wait** — duration (integer, seconds — e.g. 86400 = 1 day)\n- **split** — filters (required; flat AND array or {op: \"and\"|\"or\"|\"not\", conditions: [...]} tree), yes (steps array), no (steps array). Nested splits are allowed.\n- **emit_event** — event_name (required), event_data (object), forward_event_data (boolean)\n- **webhook** — url (required), method (POST or PUT, default POST), headers (object), body (template string with merge tags)\n- **subscribe** — channel (phone, email, or all — default phone). Subscribes the contact.\n- **unsubscribe** — channel (phone, email, or all — default phone). Unsubscribes the contact.").optional(),
    dry_run: z.boolean().default(false).describe("Preview graph without persisting"),
    idempotency_key: z.string().max(128).describe("Required for every non-dry-run persistence mutation, including create, rename patch, and replace. Draft next_calls retain one stable contract persistence key; validate next_calls may rotate validation-round keys. Reuse a contract-free caller key only for an exact retry.").optional(),
    confirm: z.boolean().default(false).describe("Required for complete-graph replace mode")
  }).strict(),
  nitro_configure_account: z.object({
    from_name: z.string().describe("Sender display name (e.g. 'Acme Marketing')").optional(),
    from_email: z.string().describe("Visible From address. May use the apex domain when an aligned sending subdomain authorizes it.").optional(),
    reply_to: z.string().describe("Reply-to email address").optional(),
    test_email_recipients: z.array(z.email()).max(5).describe("Saved email addresses for test sends (max 5). Pass empty array to clear.").optional()
  }).strict(),
  nitro_configure_providers: z.object({
    operation: z.enum(["configure", "status"]).describe("configure sets BYO provider credentials; status checks current provider health"),
    provider: z.enum(["mailgun", "ses", "postmark", "resend", "sendgrid"]).describe("Email provider (required for configure)").optional(),
    api_key: z.string().describe("Provider API key (required for configure, never returned in responses)").optional(),
    api_secret: z.string().describe("Optional provider secret (never returned in responses)").optional(),
    region: z.string().describe("Provider region where required, or the Mailgun sending domain").optional()
  }).strict(),
  nitro_control_delivery: z.object({
    target_type: z.enum(["flow", "campaign"]).describe("Entity type"),
    target_id: z.number().int().gte(1).describe("Entity ID"),
    operation: z.enum(["approve", "reject", "live", "schedule", "pause", "resume", "cancel", "archive", "restore", "delete"]).describe("Lifecycle operation. approve runs preflight. schedule is campaign-only (requires scheduled_at). delete requires confirm: true and only applies to never-sent non-live drafts/archives."),
    scheduled_at: z.iso.datetime().describe("Required for schedule operation (ISO 8601 datetime)").optional(),
    revision_id: z.number().int().gte(1).describe("Required for flow approve, reject, and live. Must be the exact current draft revision. Omit for pause/resume.").optional(),
    confirm_send_to_all: z.boolean().describe("Required when making a campaign live or scheduled with audience_type='all_contacts'. Forces an explicit all-subscribed-contacts confirmation.").optional(),
    confirm: z.boolean().describe("Required for operation='delete'.").optional(),
    idempotency_key: z.string().describe("Optional retry key for campaign live sends. Reuse the same key after a timeout to recover the same delivery progress.").optional()
  }).strict(),
  nitro_define_segment: z.object({
    name: z.string().describe("Segment name (required when preview_only: false)").optional(),
    filters: z.union([
      z.array(NitroDefineSegmentFilterNodeSchema),
      NitroDefineSegmentFilterNodeSchema
    ]).describe("Contact segment filters. Use a flat array for simple AND filters, or a boolean tree group: {op: \"and\"|\"or\"|\"not\", conditions: [...]}. A NOT group must contain exactly one condition. Leaves are attribute filters ({name, predicate, value}) or event filters ({type: \"event\", event, predicate, value?, within_days?, since?})."),
    segment_id: z.number().int().describe("Existing segment ID to update (omit for new segment)").optional(),
    preview_only: z.boolean().default(true).describe("Only preview matching contacts, do not save (default: true). Set to false + provide name to persist."),
    idempotency_key: z.string().describe("Optional deduplication key").optional()
  }).strict(),
  nitro_get_insights: z.object({
    scope: z.enum(["account", "flow", "campaign", "message"]).describe("Scope of insights: account-wide, per flow, per campaign, or per message"),
    entity_id: z.number().int().gte(1).describe("Required for flow/campaign/message scope").optional(),
    period: z.enum(["7d", "30d", "90d"]).default("30d").describe("Time period for metrics (default 30d)")
  }).strict(),
  nitro_get_status: z.object({}).passthrough(),
  nitro_import_contacts: z.object({
    records: z.array(z.object({
      email: z.string().optional(),
      phone: z.string().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      country_code: z.string().optional(),
      source: z.string().optional(),
      data: z.object({}).passthrough().describe("Custom contact fields. Values use the same merge and field-catalog rules as REST contact writes.").optional(),
      opt_in: z.boolean().describe("Explicitly set subscription state. New email contacts default to subscribed when omitted; existing contacts preserve their current state. Must be explicitly true for SMS (TCPA).").optional()
    }).passthrough()).describe("Array of contact objects (max 100): {email, phone, first_name, last_name, country_code, source, opt_in, data}. For larger custom-field updates, use the CSV path with columns mapping.").optional(),
    import_id: z.number().int().describe("Existing Import record ID for CSV processing").optional(),
    signed_id: z.string().describe("Upload signed_id returned by this tool's upload reservation after PUTing CSV bytes to direct_upload.url.").optional(),
    upload: z.object({
      filename: z.string().describe("Original CSV filename, e.g. contacts.csv."),
      content_type: z.string().describe("MIME type. Use text/csv or application/csv."),
      byte_size: z.number().int().describe("Exact file size in bytes before upload."),
      checksum: z.string().describe("Base64 MD5 checksum required by Active Storage direct upload.")
    }).strict().describe("Reserve an authorized upload link for a local CSV file. Provide filename, content_type, byte_size, and base64 MD5 checksum; then PUT bytes to the returned direct_upload.url and call this tool again with signed_id.").optional(),
    resource: z.string().default("contacts").describe("Import resource. Use contacts for contact CSV imports."),
    parser: z.string().default("default").describe("Parser name. Use default unless a future schema documents another parser."),
    columns: z.object({}).passthrough().describe("Optional import column mapping object.").optional(),
    options: z.object({
      list_ids: z.array(z.number().int()).optional()
    }).passthrough().describe("Import options, e.g. {list_ids: [123]} to add imported contacts to lists.").optional(),
    dry_run: z.boolean().default(false).describe("Preview import without persisting (default: false)"),
    idempotency_key: z.string().describe("Optional deduplication key").optional()
  }).strict(),
  nitro_inbox: z.object({
    command: z.enum(["list_queue", "get_item", "validate_reply", "list_mailbox", "get_thread", "get_thread_page", "get_message_body"]).describe("Inbox read command"),
    action_item_id: z.number().int().describe("Queue item id for get_item or validate_reply").optional(),
    conversation_id: z.number().int().describe("Conversation id for thread, body, or reply validation commands").optional(),
    before_occurred_at: z.string().describe("Exact ISO 8601 thread cursor returned by get_thread or get_thread_page").optional(),
    before_message_id: z.number().int().describe("Exact thread cursor message id returned with before_occurred_at").optional(),
    message_id: z.number().int().describe("Conversation message id for get_message_body").optional(),
    offset: z.number().int().gte(0).describe("Exact sanitized-body character offset returned by get_thread or get_message_body").optional(),
    state: z.enum(["quarantine", "needs_human", "agent_ready", "handled", "needs_attention", "all"]).describe("Optional queue state filter; default needs_attention").optional(),
    status: z.enum(["open", "closed", "archived"]).describe("Optional mailbox conversation status filter for list_mailbox").optional(),
    query: z.string().describe("Optional mailbox search across subject/preview plus exact addresses").optional(),
    inbox_id: z.number().int().describe("Optional mailbox inbox id filter").optional(),
    page: z.number().int().describe("Page number, default 1").optional(),
    per: z.number().int().describe("Results per page, max 50").optional(),
    brand_context_ref: z.string().describe("Optional verified current brand context ref for get_item/get_thread. Omit on first read; oversized context returns an exact paged resource instead of partial JSON.").optional(),
    reply_context_digest: z.string().describe("Current reply_context.context_digest required by validate_reply.").optional(),
    subject: z.string().describe("Optional reply subject for validate_reply").optional(),
    body: z.string().describe("Plain text reply body for validate_reply").optional(),
    html: z.string().describe("Optional HTML reply body for validate_reply").optional()
  }).strict(),
  nitro_inbox_action: z.object({
    command: z.enum(["send_reply", "send_reply_test", "mark_handled", "request_human", "release_to_agent", "mark_quarantine"]).describe("Inbox action command"),
    action_item_id: z.number().int().describe("Queue item id for queue-gated commands").optional(),
    conversation_id: z.number().int().describe("Mailbox conversation id for reply commands").optional(),
    subject: z.string().describe("Optional reply subject for send_reply or send_reply_test").optional(),
    body: z.string().describe("Plain text reply body for send_reply or send_reply_test").optional(),
    html: z.string().describe("Optional HTML reply body for send_reply or send_reply_test").optional(),
    reply_context_digest: z.string().describe("Current reply_context.context_digest from nitro_inbox get_item/get_thread. Required for reply commands.").optional(),
    to: z.array(z.string()).max(5).describe("Explicit test recipients for send_reply_test").optional(),
    idempotency_key: z.string().describe("Required for all action commands").optional(),
    dry_run: z.boolean().default(false).describe("Validate send_reply or send_reply_test without creating or sending")
  }).strict(),
  nitro_ingest: z.object({
    kind: z.string().describe("Asset kind to ingest. V1 supports image only.").optional(),
    image_data: z.string().describe("Image payload as raw base64 bytes or a full data URL. PNG, JPEG, or WebP only; decoded size must be under 10MB.").optional(),
    image_url: z.string().describe("Public http/https image URL to ingest into Nitro-hosted storage when permanence is desired. PNG, JPEG, or WebP only; remote file must be under 10MB.").optional(),
    signed_id: z.string().describe("Upload signed_id returned by this tool's upload reservation after PUTing image bytes to direct_upload.url.").optional(),
    description: z.string().describe("What the picture shows, e.g. 'Swimmer at dawn on St Kilda pier, cold light'. Stored with the image so later campaigns can choose it from the brand library, and used as its alt text. Applies to image_data, image_url, signed_id, and upload reservation sources.").optional(),
    upload: z.object({
      kind: z.string().describe("Asset kind. V1 supports image only."),
      filename: z.string().describe("Original image filename, e.g. hero.png."),
      content_type: z.string().describe("MIME type. Use image/png, image/jpeg, or image/webp."),
      byte_size: z.number().int().describe("Exact file size in bytes before upload."),
      checksum: z.string().describe("Base64 MD5 checksum required by Active Storage direct upload.")
    }).strict().describe("Reserve an authorized upload link for a local asset. V1 supports kind=image only. Provide filename, content_type, byte_size, and base64 MD5 checksum; then PUT bytes to the returned direct_upload.url and call this tool again with signed_id.").optional(),
    filename: z.string().describe("Original filename for image_data uploads, or an optional filename override for image_url/signed_id sources.").optional(),
    content_type: z.string().describe("Optional MIME type hint when image_data is raw base64 rather than a data URL.").optional()
  }).strict(),
  nitro_manage_audience: z.object({
    operation: z.enum(["create_contact", "update_contact", "set_subscription", "manage_list", "record_event", "delete_segment", "bulk_tag"]).describe("Which audience operation to perform. Each operation expects specific params:\n\n- **create_contact** — params: {email (string), phone (string), opt_in (boolean, recommended: true), attributes: {first_name, last_name, country_code, source, data: {custom_field: value}}}\n- **update_contact** — params: {contact_id or contact_email (exactly one), attributes: {first_name, last_name, country_code, source, data: {custom_field: value}}}. Custom data is merged; omitted, null, and empty-string values do not erase existing values.\n- **set_subscription** — params: {contact_id (required), kind: \"email\"|\"phone\" (required), opt_in (boolean), opt_out (boolean), unsubscribe_all (boolean)}. Value auto-resolved from contact.\n- **manage_list** — params: {action: \"create\"|\"rename\"|\"delete\"|\"add_contacts\"|\"remove_contacts\" (required), list_id (integer), name (string), contact_ids (integer[]) or emails (string[])}\n- **record_event** — params: {contact_id or contact_email (one required), event (required, custom names allowed e.g. order_confirmed), data (object, max 32KB), resource_uid, resource_name, resource_url, amount}\n- **delete_segment** — params: {segment_id (required), force (boolean)}. Requires confirm: true.\n- **bulk_tag** — params: {contact_ids (integer[], required), tags (string[], required), tag_action: \"add\"|\"remove\"|\"set\" (default: \"add\")}"),
    params: z.object({}).passthrough().describe("Operation-specific parameters. See operation description for required/optional fields."),
    dry_run: z.boolean().default(false).describe("Preview changes without persisting (default: false)"),
    confirm: z.boolean().default(false).describe("Required for destructive operations: delete_segment, manage_list with action='delete'"),
    idempotency_key: z.string().describe("Optional deduplication key. Same key returns cached result.").optional()
  }).strict(),
  nitro_manage_billing: z.object({
    operation: z.enum(["status", "checkout", "checkout_status", "plans", "add_funds", "funding_purchase_status"]).describe("Billing operation to perform"),
    params: z.object({
      plan_id: z.number().int().describe("Plan ID (required for checkout)").optional(),
      amount_cents: z.number().int().describe("Integer amount in minor currency units").optional(),
      currency: z.string().describe("Three-letter funding currency").optional(),
      idempotency_key: z.string().describe("Stable key for this Add funds request").optional(),
      purchase_id: z.number().int().describe("Local funding purchase ID").optional()
    }).strict().describe("Operation-specific parameters.").optional()
  }).strict(),
  nitro_manage_domains: z.object({
    operation: z.enum(["add", "verify", "check_dns", "list", "remove"]).describe("Which domain operation to perform:\n\n- **add** — params: {domain_name (required, e.g. \"send.acme.com\"), author_domain (optional, e.g. \"acme.com\")}. Registers the technical sending domain with the email provider and returns DNS records. Managed SES also prepares the aligned visible From domain when the sending domain is a subdomain. Apex receiving MX is omitted unless forward-all is already active. Idempotent: calling add on a pending domain re-returns the DNS records.\n- **verify** — params: {domain_name (required)}. Checks with the email provider after every customer-facing sending record has propagated. Also runs independent DNS validation and returns per-record dns_health. Route-gated apex receiving MX is outside sender verification. If verified, completes the domain_verified onboarding step and unlocks sending. If still pending, returns the DNS records again so you can re-show them to the user.\n- **check_dns** — params: {domain_name (required)}. Runs independent DNS validation plus live HTTPS readiness for branded tracking. Does not call the email provider. Useful for diagnosing missing or incorrect customer-facing records, Nitro-managed delegate targets, and tracking TLS failures before verify. Every customer-facing sending record must pass; apex receiving MX is returned only after forward-all is active.\n- **list** — no params needed. Returns all account domains with their verification status and DNS records. Includes dns_health, dmarc_policy, domain_limit (from tier), and domains_used count.\n- **remove** — params: {domain_name (required), unpair (optional)}. Deletes the domain. Requires confirm: true. If the domain is paired, the first attempt explains whether its counterpart will also be removed; ask the user to confirm that exact outcome, then retry with unpair: true."),
    params: z.object({
      domain_name: z.string().describe("Technical sending domain to manage (e.g. 'send.acme.com'). Required for add, verify, remove.").optional(),
      author_domain: z.string().describe("Optional visible From domain to authorize for managed SES (e.g. 'acme.com'). Must be the organizational domain of domain_name.").optional(),
      unpair: z.boolean().describe("For remove only. After the paired-domain warning has been shown and its exact outcome confirmed, set true to remove the selected domain and tear down its identity pair.").optional()
    }).strict().describe("Operation-specific parameters.").optional(),
    confirm: z.boolean().default(false).describe("Required for remove operation (destructive)")
  }).strict(),
  nitro_manage_outreach: z.object({
    action: z.enum(["intent", "estimate", "start", "status", "pause", "resume", "cancel"]).describe("intent, estimate, start, status, pause, resume, or cancel."),
    goal: z.string().describe("Operator's outreach objective. Supply on intent so the returned scaffold is grounded in the actual task.").optional(),
    name: z.string().describe("Campaign name. Required for start.").optional(),
    target_profile: z.object({
      criteria: z.array(z.object({
        key: z.string().describe("Stable criterion name used in coverage and fit findings.").optional(),
        subject: z.enum(["prospect", "company", "signal"]).default("prospect").describe("The evidence subject evaluated by this criterion."),
        field: z.string().describe("Canonical profile field, such as title, seniority, organization_industry, or organization_employee_range."),
        operator: z.enum(["equals", "includes", "includes_any", "in", "range", "present"]).default("equals"),
        value: z.unknown().describe("Expected scalar, list, or range. Omit only for the present operator.").optional(),
        required: z.boolean().default(false).describe("A required unknown or mismatch prevents a person from matching."),
        weight: z.number().default(1).describe("Relative weight for non-required fit ranking."),
        minimum_confidence: z.number().gte(0).lte(1).default(0),
        maximum_age_days: z.number().int().gte(1).describe("Optional freshness ceiling for evidence used by this criterion.").optional()
      }).strict()).min(1)
    }).strict().optional(),
    capabilities: z.array(z.enum(["professional_profiles", "connected_profiles", "community_signals", "hiring_activity"])).refine(values => new Set(values).size === values.length, { message: "Array items must be unique" }).describe("Optional outcome capabilities returned by intent. Omit to use current defaults. Required capabilities are always included.").optional(),
    seeds: z.array(z.object({
      domain: z.string().optional(),
      website_url: z.string().optional(),
      careers_url: z.string().optional(),
      company_name: z.string().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      linkedin_url: z.string().optional(),
      source_record_id: z.string().optional()
    }).strict()).max(100).describe("Optional bounded first-party person or company seeds. Supplying a company never makes it an outreach recipient.").optional(),
    seed_artifacts: z.array(z.object({
      signed_id: z.string()
    }).strict()).max(5).describe("Optional purpose-bound CSV seed manifests uploaded for the current account and brand.").optional(),
    exclusions: z.object({
      company_domains: z.array(z.string()).max(100).refine(values => new Set(values).size === values.length, { message: "Array items must be unique" }).optional()
    }).strict().describe("Optional campaign-local company exclusions. Brand suppressions for customers, active deals, replies, opt-outs, and manual blocks always apply.").optional(),
    target_count: z.number().int().gte(1).lte(1000).describe("Maximum number of accepted qualified people to return.").optional(),
    maximum_spend_cents: z.number().int().gte(0).describe("Customer-authorized maximum charge in USD cents. Use the estimate quote unchanged unless the operator narrows the target.").optional(),
    campaign_id: z.number().int().describe("Required for status, pause, resume, and cancel.").optional(),
    brand_context_ref: z.string().describe("Optional current ref returned by intent. A valid ref suppresses repeated inline context; a stale ref returns the fresh full context.").optional(),
    idempotency_key: z.string().max(128).describe("Required for start. Reuse only for an exact retry of the same campaign input.").optional()
  }).strict(),
  nitro_manage_template: z.object({
    sections: z.array(z.object({}).passthrough()).describe("Array of section objects: {id?, type, props, styles?}. Read nitro://schema for full prop specs. Persisted sections receive stable top-level ids for future section_updates targeting.\n\nSection types and key props:\n\n- **header** — {variant, wordmark_text, logo_url, logo_alt, logo_width, background_color}\n- **text** — {content (HTML string)}\n- **image** — {src, alt, href, width}\n- **button** — {text, href, background_color, text_color, section_background_color, align, border_radius, inner_padding, font_weight, font_family, text_transform}. background_color is the button fill; section_background_color is the surrounding band.\n- **columns** — {columns: [{width, sections: [...]}]} — nested sections inside columns\n- **product** — {name, price, image_url, href, description}\n- **social** — {links: [{platform, url}], align}\n- **divider** — {color, width, padding}\n- **spacer** — {height}\n- **footer** — {unsubscribe_text}. Nitrosend fills the canonical company name and physical address from the active Brand; callers cannot override legal identity.\n\nImage URL props accept public URLs or nitro_ingest media_url/image_url values (never raw signed_id); upload local files via nitro_ingest first.").optional(),
    section_updates: z.array(z.object({
      id: z.string().describe("Stable section id from the stored template sections array. Preferred target.").optional(),
      index: z.number().int().describe("0-based section index").optional(),
      type: z.string().describe("Existing section type to target or assert").optional(),
      occurrence: z.number().int().describe("0-based occurrence among sections of the requested type").optional(),
      props: z.object({}).passthrough().describe("Props to shallow-merge. Only known visual/non-copy props use the direct path; copy-bearing or unknown props enter the composition contract.").optional(),
      styles: z.object({}).passthrough().describe("Styles to shallow-merge into the target section").optional(),
      text_patch: z.object({
        prop: z.string().describe("String prop to edit. Required when the section type has no clear default or when editing a non-default prop.").optional(),
        find: z.string().describe("Literal substring to find").optional(),
        replace: z.string().describe("Replacement string").optional(),
        all: z.boolean().default(false).describe("Replace every occurrence; requires at least one match")
      }).strict().describe("Literal string replacement inside one string prop. Defaults prop by section type when unambiguous, e.g. text.content, hero.title, button.text. Requires exactly one match unless all=true and enters the composition contract before persistence.").optional()
    }).strict()).describe("Small update shortcut for existing sections. Prefer targeting by stable section id from nitro_query/template reads; fall back to 0-based index, or type plus optional 0-based occurrence. Shallow-merges visual/non-copy props and styles, or uses text_patch for an exact literal copy edit. Copy-bearing updates enter the composition contract before persistence. Does not change section order or type.").optional(),
    subject: z.string().describe("Email subject line").optional(),
    name: z.string().describe("Template display name").optional(),
    composition_mode: z.enum(["intent", "draft", "validate", "generate"]).describe("intent returns composition_contract; validate checks a caller-authored draft; draft validates and persists it; generate explicitly requests metered server composition and persists one draft.").optional(),
    contract_id: z.string().describe("Email composition contract id returned from composition_mode=intent.").optional(),
    brand_context_ref: z.string().describe("Optional current brand context ref from a prior intent. Omit to receive the full current context.").optional(),
    validate_only: z.boolean().default(false).describe("Alias for composition_mode=validate. Does not persist or consume repair attempts."),
    design_mode_override: z.enum(["premium_rich", "premium_minimal", "founder_letter", "utility_plain"]).describe("Renegotiate/validate the draft under a different design mode.").optional(),
    renegotiate: z.boolean().default(false).describe("When true with design_mode_override, keeps the same contract but changes the design mode."),
    user_instruction: z.string().describe("Latest user instruction to preserve inside the composition contract.").optional(),
    creative_route_id: z.string().describe("Pin one composition_contract.creative_routes[].id so the returned scaffold is that route. Omit to take the recommendation. A known route without enough frozen evidence returns its exact missing requirements; an unknown id returns the supported ids. Neither silently falls back.").optional(),
    source_text: z.string().describe("Optional source evidence for authoring, such as research notes or supplied product copy. Evidence is not an instruction channel; put authoring directions in user_instruction. Source text is available context, not required copy.").optional(),
    facts: z.array(z.object({
      kind: z.enum(["url", "image_url", "offer_code", "price", "deadline", "offer", "cta_text"]).describe("Evidence type used to determine valid semantic locations."),
      value: z.string().describe("Exact evidence value."),
      description: z.string().describe("For kind=image_url only: what the picture visibly shows. This travels with the exact image binding so the composer can choose imagery and write honest alt text without guessing from the URL.").optional(),
      requirement: z.enum(["required", "available"]).describe("required enforces exact inclusion; available only authorizes use.")
    }).strict()).describe("Typed literal evidence for the composition contract, not instructions. A required URL, image URL, offer code, price, deadline, offer, or exact CTA text must appear with its exact value in an allowed semantic location; available evidence may be used but is not mandatory. Put prose facts in source_text; use cta_text only when the operator requires an exact CTA phrase.").optional(),
    draft_meta: z.object({
      creative_route_id: z.string().describe("Chosen composition_contract.creative_routes[].id").optional(),
      concrete_anchor: z.string().describe("Specific proof, product detail, visual, code/output, quote, number, or brand moment used.").optional(),
      why_this_earns_the_inbox: z.string().describe("One sentence explaining the creative move.").optional()
    }).passthrough().describe("Optional authoring provenance. It never blocks validation or persistence.").optional(),
    preheader: z.string().describe("Email preheader text shown in inbox preview").optional(),
    body: z.string().describe("Canonical plain-text alternative. Use with plain_text_mode=custom; derived mode refreshes it from sections.").optional(),
    plain_text_mode: z.enum(["derived", "custom"]).describe("Text-alternative authority returned by the composition scaffold: derived from design or custom body.").optional(),
    from_name: z.string().describe("Sender name (falls back to account default)").optional(),
    from_email: z.string().describe("Sender email (falls back to account default)").optional(),
    reply_to: z.string().describe("Reply-to email address").optional(),
    theme: z.object({}).passthrough().describe("Theme overrides merged on top of brand theme. Keys: brand_color, bg_color, text_color, font_body, font_heading, heading_size, body_size, radius, spacing_density, button_background_color, button_text_color, button_padding, and logo_url. logo_url must be a public URL or nitro_ingest media_url/image_url, never raw signed_id.").optional(),
    template_id: z.number().int().describe("Template ID for update mode — provide with fields to change").optional(),
    based_on: z.number().int().describe("Source template ID for clone mode — creates a copy").optional(),
    if_version: z.number().int().describe("Optimistic concurrency — rejects update if template version mismatches").optional(),
    goal: z.string().describe("Goal for the template authoring contract").optional(),
    dry_run: z.boolean().default(false).describe("Validate and preview without persisting"),
    idempotency_key: z.string().max(128).describe("Required for every non-dry-run persistence mutation, including create, clone, targeted section update, and full update. Draft next_calls retain one stable contract persistence key; validate next_calls may rotate validation-round keys. Reuse a contract-free caller key only for an exact retry.").optional()
  }).strict(),
  nitro_query: z.object({
    entity: z.enum(["flows", "campaigns", "templates", "segments", "contacts", "lists", "events", "imports", "messages", "suppressions", "history", "products"]).describe("Which entity type to query. Use nitro_search_contacts for full-text contact search."),
    filters: z.object({}).passthrough().describe("Entity-specific filters. All entities support id (integer) to fetch a single record.\n\n- **flows** — status (draft/live/paused/archived/cancelled), campaign_id (integer|null), trigger_event (string), search (string)\n- **campaigns** — status (draft/scheduled/live/paused/completed/cancelled/archived), search (string)\n- **templates** — subject (string, ILIKE match on subject line)\n- **segments** — name (string, ILIKE match)\n- **contacts** — query (string, full-text search), subscribed_email (boolean), subscribed_phone (boolean), list_id (integer)\n- **lists** — name (string, ILIKE match)\n- **events** — name (string, exact event type), from (ISO 8601 datetime), to (ISO 8601 datetime)\n- **imports** — status (pending/processing/complete/failed/canceled/contact_us)\n- **messages** — channel (email/sms), status (queued/sent/failed), to (string, recipient address)\n- **suppressions** — email, reason (hard_bounce/soft_bounce/complaint/manual/admin), source_provider, active (boolean)\n- **history** — source (notification/tool), event_type, tool, actor, correlation_id, resource_uri, from, to\n- **products** — status (active/draft/archived/deleted), query (string, title/handle match)").optional(),
    page: z.number().int().describe("Page number (default 1)").optional(),
    per: z.number().int().describe("Results per page (max 50, default 25)").optional()
  }).strict(),
  nitro_request_support: z.object({
    subject: z.string().describe("Brief summary of the issue"),
    message: z.string().describe("Complete, self-contained summary of the issue. Must fit within 1500 characters; do not rely on truncation.")
  }).strict(),
  nitro_review_delivery: z.object({
    target_type: z.enum(["template", "flow", "campaign"]).describe("Entity type to review"),
    target_id: z.number().int().gte(1).describe("Entity ID to review"),
    revision_id: z.number().int().gte(1).describe("Required for flows. Exact immutable flow revision to review.").optional(),
    contact_id: z.number().int().gte(1).describe("Optional contact ID for merge-tag personalization during review").optional()
  }).strict(),
  nitro_search_contacts: z.object({
    query: z.string().describe("Email address, name, or phone number"),
    mode: z.enum(["summary", "profile"]).describe("summary = list, profile = single contact detail (default: summary)").optional(),
    page: z.number().int().describe("Page number (default 1)").optional(),
    per: z.number().int().describe("Results per page (max 50, default 25)").optional()
  }).strict(),
  nitro_search_docs: z.object({
    query: z.string().describe("What to look up, e.g. 'verify sending domain', 'rest api authentication', 'cli install', 'connect cursor'"),
    limit: z.number().int().default(6).describe("Maximum results to return (default 6, max 10)")
  }).strict(),
  nitro_select_account: z.object({
    account_id: z.number().int().describe("ID of the account to switch to. Get IDs from nitro_get_status.available_accounts.items[*].id.")
  }).strict(),
  nitro_select_brand: z.object({
    brand_sid: z.string().describe("Exact brand SID to select. Provide either brand_sid or name.").optional(),
    name: z.string().describe("Brand name to select when the SID is unknown. Provide either name or brand_sid. Ambiguous names return candidates without changing context.").optional()
  }).strict(),
  nitro_send_message: z.object({
    channel: z.enum(["email", "sms"]).describe("Delivery channel"),
    to: z.string().describe("Recipient email address or E.164 phone number"),
    subject: z.string().describe("Email subject line (required for email)").optional(),
    body: z.string().describe("Message body. Required for SMS. Optional plain text for email.").optional(),
    template_id: z.number().int().describe("Load email design from an existing template (email only)").optional(),
    data: z.object({}).passthrough().describe("Transactional merge variables. Use in email templates as {{ data.order_id }} or nested paths like {{ data.customer.name }}.").optional(),
    idempotency_key: z.string().min(1).describe("Required for live sends. Reuse the same stable key on retry to prevent duplicate delivery.").optional(),
    dry_run: z.boolean().default(false).describe("Validate and preview without sending")
  }).strict(),
  nitro_send_test_message: z.object({
    target_type: z.enum(["template", "flow", "campaign"]).describe("Target entity type. Use with target_id unless latest_campaign or template_id is used.").optional(),
    target_id: z.number().int().gte(1).describe("Target entity ID. Use with target_type.").optional(),
    latest_campaign: z.boolean().default(false).describe("Use the most recently created campaign in this brand."),
    template_id: z.number().int().gte(1).describe("Template to test directly, or the specific flow/campaign template to choose.").optional(),
    action_id: z.number().int().gte(1).describe("Flow action ID to test when a flow has multiple message steps.").optional(),
    revision_id: z.number().int().gte(1).describe("Required for flow targets. Exact immutable flow revision to test.").optional(),
    channel: z.enum(["auto", "email", "sms"]).default("auto").describe("Channel to test. Use auto unless a standalone template is ambiguous."),
    contact_id: z.number().int().gte(1).describe("Contact ID for recipient and merge-tag personalization. If present, this contact supplies the recipient address/phone.").optional(),
    to: z.array(z.string()).max(5).describe("Explicit test recipients. Use email addresses for email targets and E.164 phone numbers for SMS targets.").optional(),
    dry_run: z.boolean().default(false).describe("Validate target and recipients without sending."),
    idempotency_key: z.string().min(1).describe("Required for live test sends. Reuse the same stable key on retry to prevent duplicate delivery.").optional()
  }).strict(),
  nitro_set_brand_kit: z.object({
    url: z.string().describe("Website URL to scrape Brand Kit from").optional(),
    logo_url: z.string().describe("Public or Nitro CDN URL to a logo image (png/jpg/webp/svg) to attach. For local logo files, upload via nitro_ingest first and pass the returned media_url/image_url (raw signed_id values are not accepted).").optional(),
    fields: z.object({
      brand_color: z.string().describe("Hex color e.g. #ff0000").optional(),
      text_color: z.string().describe("Hex color").optional(),
      bg_color: z.string().describe("Hex color").optional(),
      font_body: z.string().optional(),
      font_heading: z.string().optional(),
      heading_size: z.number().int().describe("Heading/title font size in pixels, 12-48").optional(),
      body_size: z.number().int().describe("Body text font size in pixels, 12-20").optional(),
      radius: z.number().int().describe("Global brand corner radius in pixels, 0-64. Defaults to 8; set 0 for square corners across every eligible layer.").optional(),
      spacing_density: z.enum(["compact", "normal", "spacious"]).describe("Section spacing rhythm: compact, normal, or spacious").optional(),
      company_name: z.string().optional(),
      physical_address: z.string().optional(),
      company_description: z.string().optional()
    }).passthrough().describe("Direct Brand Kit field updates").optional(),
    document: z.string().describe("Full brand voice markdown document").optional(),
    dry_run: z.boolean().default(false).describe("Preview changes without persisting"),
    mode: z.enum(["sync", "async"]).default("sync").describe("sync (default) or async for URL scraping"),
    idempotency_key: z.string().max(128).describe("Required for non-dry-run URL scraping or remote logo fetches. Reuse the same key only for an exact retry. Direct fields/document updates may omit it.").optional()
  }).strict(),
  nitro_set_memory: z.object({
    operation: z.enum(["read", "update", "patch", "append"]).describe("read: get current document. update: replace entirely. patch: replace a ## section by heading. append: add text to end."),
    document: z.string().describe("Full markdown document (required for update).").optional(),
    heading: z.string().describe("Section heading to patch (e.g. 'Brand Goals'). Required for patch operation. Matches ## headings.").optional(),
    content: z.string().describe("New content for the section (patch) or text to append (append).").optional(),
    dry_run: z.boolean().default(false),
    idempotency_key: z.string().max(128).describe("Required for non-dry-run append. Reuse the same key only for an exact retry. Update and patch are set operations and may omit it.").optional()
  }).strict(),
} as const;

export type NitrosendToolName = keyof typeof nitrosendToolSchemas;

export const nitrosendToolNames: readonly NitrosendToolName[] = Object.freeze(
  Object.keys(nitrosendToolSchemas) as NitrosendToolName[],
);

export type NitrosendToolSchemaMap<T extends readonly NitrosendToolName[]> = {
  [K in T[number]]: { inputSchema: (typeof nitrosendToolSchemas)[K] };
};

export function pickNitrosendToolSchemas<const T extends readonly NitrosendToolName[]>(
  ...names: T
): NitrosendToolSchemaMap<T> {
  const out: Record<string, { inputSchema: unknown }> = {};
  for (const name of names) {
    out[name] = { inputSchema: nitrosendToolSchemas[name] };
  }
  return out as NitrosendToolSchemaMap<T>;
}
