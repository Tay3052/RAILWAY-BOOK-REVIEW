export const CloseButton = forwardRef<CloseButtonProps, "button">(
  (props, ref) => {
    const [styles, mergedProps] = useComponentStyle("CloseButton", props);
    const {
      className,
      children,
      isDisabled,
      isRounded,
      __css,
      disableRipple,
      ...rest
    } = omitThemeProps(mergedProps);
    const { onPointerDown, ...rippleProps } = useRipple({
      ...rest,
      isDisabled: disableRipple || isDisabled,
    });

    const css: CSSUIObject = {
      position: "relative",
      overflow: "hidden",
      outline: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      ...styles,
      ...__css,
      ...(isRounded ? { borderRadius: "fallback(full, 9999px)" } : {}),
    };

    return (
      <ui.button
        ref={ref}
        type="button"
        aria-label="Close"
        className={cx("ui-close-button", className)}
        disabled={isDisabled}
        __css={css}
        {...rest}
        onPointerDown={onPointerDown}>
        {children || <CloseIcon width="1em" height="1em" />}

        <Ripple isDisabled={disableRipple || isDisabled} {...rippleProps} />
      </ui.button>
    );
  }
);
