export class Regex {
  public static readonly PASSWORD_PATTERN: any = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/;
  public static readonly NAME_PATTERN = /^[a-zA-Z0-9 \[\]^\/_\-\n]{2,200}$/;
  public static readonly USER_NAME_PATTERN = /^[a-zA-Z]{3,200}$/;
  public static readonly USER_PATTERN = /^[a-zA-Z ]{3,200}$/;
  public static readonly DESCRIPTION_PATTERN = /^[a-zA-Z0-9 \[\]()-,^\/_\-\n]{5,400}$/;
  public static readonly COMMENT_PATTERN = /^[a-zA-Z0-9 \[\]()-,^\/_\-\n]{5,1000}$/;
  public static readonly FLAT_STRING_PATTERN = /^[a-zA-Z \[\]^\/]{2,200}$/;
  public static readonly NUMBER_PATTERN = /^[0-9]*$/;
	public static readonly FLOAT_NUMBER_PATTERN = /^[0-9.]*$/;
	public static readonly ALPHANUMERIC_NAME_PATTERN = /^[a-zA-Z0-9 \[\]()-.,;:!&@#%$^\/_\-\n]{2,200}$/;
  public static readonly ACTIVITY_RESULT_TYPE_PATTERN = /^[a-zA-Z0-9 \[\]()-.,;:!&@#%$^\/_\-\n]{1,50}$/;
	public static readonly VERIFICATION_CODE_PATTERN = /([a-zA-Z0-9]{8,30}\s*)+/;
  public static readonly RESET_PASSWORD_CODE_PATTERN = /([a-zA-Z0-9]{4,30}\s*)+/;
  public static readonly DATE_PATTERN = /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/;
  public static readonly EMAIL_PATTERN = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  public static readonly AVATAR_A_D = /^[A-D]*$/;
  public static readonly AVATAR_E_H = /^[E-H]*$/;
  public static readonly AVATAR_I_L = /^[I-L]*$/;
  public static readonly AVATAR_M_P = /^[M-P]*$/;
  public static readonly AVATAR_Q_T = /^[Q-T]*$/;
  public static readonly AVATAR_U_Z = /^[U-Z]*$/;
}
