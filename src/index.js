/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls, InnerBlocks } from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl
} from "@wordpress/components";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType("mwd/parallax-images", {
  /**
   * This is the display title for your block, which can be translated with `i18n` functions.
   * The block inserter will show this name.
   */
  title: __("Parallax Image", "create-block"),

  /**
   * This is a short description for your block, can be translated with `i18n` functions.
   * It will be shown in the Block Tab in the Settings Sidebar.
   */
  description: __("", "create-block"),

  /**
   * Blocks are grouped into categories to help users browse and discover them.
   * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
   */
  category: "layout",

  /**
   * An icon property should be specified to make it easier to identify a block.
   * These can be any of WordPress’ Dashicons, or a custom svg element.
   */
  icon: "format-gallery",

  /**
   * Optional block extended support features.
   */
  supports: {
    // Removes support for an HTML mode.
    html: false
  },
  attributes: {
    scale: {
      type: "integer",
      default: 1.5
    },
    delay: {
      type: "integer",
      default: 0
    },
    maxTransition: {
      type: "integer",
      default: 100
    },
    orientation: {
      type: "string",
      default: "up"
    },
    overflow: {
      type: "boolean",
      default: 0
    }
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
   *
   * @param {Object} [props] Properties passed from the editor.
   *
   * @return {WPElement} Element to render.
   */
  edit(props) {
    const TEMPLATE = [["core/image"]];
    const { className, attributes, setAttributes } = props;

    return (
      <div className={className}>
        <InspectorControls>
          <PanelBody title="Parallax Configuration" icon="" initialOpen={true}>
            <RangeControl
              label="Speed"
              help="The higher the speed is set, the more visible the parallax effect will be."
              value={attributes.scale}
              min={0}
              max={3}
              step={0.25}
              onChange={value => {
                setAttributes({ scale: value });
              }}
            />

            <RangeControl
              label="Delay (seconds)"
              help="When a delay is set, the translation of the image will continue during that delay when the user stops scrolling. That gives a very nice effect. The delay is in seconds."
              value={attributes.delay}
              min={0}
              max={10}
              step={0.25}
              onChange={value => {
                setAttributes({ delay: value });
              }}
            />
            <SelectControl
              label="Direction"
              help="The orientation (or direction) of the parallax effect."
              value={attributes.orientation}
              options={[
                { label: "Up", value: "up" },
                { label: "Down", value: "down" },
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
                { label: "Up Left", value: "up left" },
                { label: "Up Right", value: "up right" },
                { label: "Down Left", value: "down left" },
                { label: "Down Right", value: "down rights" }
              ]}
              onChange={value => {
                setAttributes({ orientation: value });
              }}
            />
            <ToggleControl
              label="Overflow"
              help={
                attributes.overflow
                  ? "Image will overflow."
                  : "Image will not overflow."
              }
              checked={attributes.overflow}
              onChange={value => {
                setAttributes({ overflow: value });
              }}
            />
            <RangeControl
              label="Max Transition"
              help="Used to stop the parallax animation after a given percentage. By default, it translates from 0% to 100% of the user viewport."
              value={attributes.maxTransition}
              min={0}
              max={100}
              onChange={value => {
                setAttributes({ maxTransition: value });
              }}
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks template={TEMPLATE} templateLock="true" />
      </div>
    );
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by the block editor into `post_content`.
   *
   * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
   *
   * @return {WPElement} Element to render.
   */
  save(props) {
    const { className, attributes } = props;

    return (
      <div
        data-scale={attributes.scale}
        data-delay={attributes.delay}
        data-orientation={attributes.orientation}
        data-overflow={attributes.overflow}
        data-maxtransition={attributes.maxTransition}
      >
        <InnerBlocks.Content />
      </div>
    );
  }
});
