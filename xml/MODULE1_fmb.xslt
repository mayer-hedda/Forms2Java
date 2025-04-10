<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:f="http://xmlns.oracle.com/Forms"
    version="1.0"
    exclude-result-prefixes="f">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Oracle Forms Module</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1, h2 { color: #003366; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Form: <xsl:value-of select="//f:FormModule/@Name"/></h1>

        <xsl:for-each select="//f:Block">
          <h2>Block: <xsl:value-of select="@Name"/></h2>
          
          <h3>Items</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Prompt</th>
              <th>Type</th>
              <th>DataType</th>
              <th>ColumnName</th>
            </tr>
            <xsl:for-each select="f:Item">
              <tr>
                <td><xsl:value-of select="@Name"/></td>
                <td><xsl:value-of select="@Prompt"/></td>
                <td><xsl:value-of select="@ItemType"/></td>
                <td><xsl:value-of select="@DataType"/></td>
                <td><xsl:value-of select="@ColumnName"/></td>
              </tr>
            </xsl:for-each>
          </table>

          <h3>Data Source Columns</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Length</th>
              <th>Scale</th>
              <th>Precision</th>
            </tr>
            <xsl:for-each select="f:DataSourceColumn">
              <tr>
                <td><xsl:value-of select="@DSCName"/></td>
                <td><xsl:value-of select="@DSCType"/></td>
                <td><xsl:value-of select="@DSCLength"/></td>
                <td><xsl:value-of select="@DSCScale"/></td>
                <td><xsl:value-of select="@DSCPrecision"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
